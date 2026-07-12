// Generates /supabase/seed.sql from /supabase/seed-data.mts, computing a
// multilingual embedding for every activity recipe so runtime search is a
// pure pgvector similarity query (CLAUDE.md §8).
//
// Run locally:  node scripts/generate-seed.mts
// First run downloads the embedding model (~100 MB, cached afterwards).

import { writeFile } from "node:fs/promises";
import { pipeline } from "@huggingface/transformers";
import {
  badges,
  books,
  earnedBadges,
  libraries,
  libraryBooks,
  loggedBooks,
  profile,
  recipes,
  type RecipeSeed,
} from "../supabase/seed-data.mts";

export const EMBEDDING_MODEL = "Xenova/paraphrase-multilingual-MiniLM-L12-v2";

const esc = (value: string) => value.replace(/'/g, "''");
const lit = (value: string) => `'${esc(value)}'`;

function recipeEmbeddingText(recipe: RecipeSeed): string {
  return [
    `${recipe.titleEn}. ${recipe.summaryEn} Lesson learned: ${recipe.lessonEn}`,
    `Theme: ${recipe.theme}. Ages ${recipe.ageMin} to ${recipe.ageMax}. Duration: ${recipe.durationMinutes} minutes.`,
    `${recipe.titleAr}. ${recipe.summaryAr} الدرس المستفاد: ${recipe.lessonAr}`,
  ].join(" ");
}

async function embedRecipes(): Promise<number[][]> {
  console.log(`Loading embedding model ${EMBEDDING_MODEL}…`);
  const extractor = await pipeline("feature-extraction", EMBEDDING_MODEL, {
    dtype: "q8",
  });
  console.log(`Embedding ${recipes.length} recipes…`);
  const output = await extractor(recipes.map(recipeEmbeddingText), {
    pooling: "mean",
    normalize: true,
  });
  return output.tolist() as number[][];
}

function buildSql(embeddings: number[][]): string {
  const parts: string[] = [];

  parts.push(`-- GENERATED FILE — do not edit by hand.
-- Regenerate with: node scripts/generate-seed.mts
-- Idempotent: slug-keyed upserts, safe to re-run.
-- Run in the Supabase SQL editor AFTER schema.sql.
`);

  parts.push(`insert into public.libraries
  (slug, name_en, name_ar, city_en, city_ar, description_en, description_ar, location)
values
${libraries
  .map(
    (l) =>
      `  (${lit(l.slug)}, ${lit(l.nameEn)}, ${lit(l.nameAr)}, ${lit(l.cityEn)}, ${lit(l.cityAr)}, ${lit(l.descriptionEn)}, ${lit(l.descriptionAr)}, extensions.st_setsrid(extensions.st_makepoint(${l.lon}, ${l.lat}), 4326)::extensions.geography)`,
  )
  .join(",\n")}
on conflict (slug) do update set
  name_en = excluded.name_en, name_ar = excluded.name_ar,
  city_en = excluded.city_en, city_ar = excluded.city_ar,
  description_en = excluded.description_en, description_ar = excluded.description_ar,
  location = excluded.location;
`);

  parts.push(`insert into public.books
  (slug, title_en, title_ar, author_en, author_ar, age_min, age_max, summary_en, summary_ar, cover_emoji, cover_color)
values
${books
  .map(
    (b) =>
      `  (${lit(b.slug)}, ${lit(b.titleEn)}, ${lit(b.titleAr)}, ${lit(b.authorEn)}, ${lit(b.authorAr)}, ${b.ageMin}, ${b.ageMax}, ${lit(b.summaryEn)}, ${lit(b.summaryAr)}, ${lit(b.coverEmoji)}, ${lit(b.coverColor)})`,
  )
  .join(",\n")}
on conflict (slug) do update set
  title_en = excluded.title_en, title_ar = excluded.title_ar,
  author_en = excluded.author_en, author_ar = excluded.author_ar,
  age_min = excluded.age_min, age_max = excluded.age_max,
  summary_en = excluded.summary_en, summary_ar = excluded.summary_ar,
  cover_emoji = excluded.cover_emoji, cover_color = excluded.cover_color;
`);

  const libraryBookRows = Object.entries(libraryBooks).flatMap(
    ([librarySlug, entries]) =>
      entries.map(
        ([bookSlug, copies]) =>
          `  (${lit(librarySlug)}, ${lit(bookSlug)}, ${copies})`,
      ),
  );
  parts.push(`insert into public.library_books (library_id, book_id, copies)
select l.id, b.id, v.copies
from (values
${libraryBookRows.join(",\n")}
) as v(library_slug, book_slug, copies)
join public.libraries l on l.slug = v.library_slug
join public.books b on b.slug = v.book_slug
on conflict (library_id, book_id) do update set copies = excluded.copies;
`);

  const recipeRows = recipes.map((r, i) => {
    const vector = `[${embeddings[i].map((n) => n.toFixed(6)).join(",")}]`;
    return `  (${lit(r.slug)}, ${lit(r.titleEn)}, ${lit(r.titleAr)}, ${lit(r.theme)}, ${r.ageMin}, ${r.ageMax}, ${r.durationMinutes}, ${lit(r.bookSlug)}, ${lit(r.summaryEn)}, ${lit(r.summaryAr)}, ${lit(r.lessonEn)}, ${lit(r.lessonAr)}, ${lit(vector)})`;
  });
  parts.push(`insert into public.recipes
  (slug, title_en, title_ar, theme, age_min, age_max, duration_minutes, book_id, summary_en, summary_ar, lesson_en, lesson_ar, embedding)
select
  v.slug, v.title_en, v.title_ar, v.theme, v.age_min, v.age_max,
  v.duration_minutes, b.id, v.summary_en, v.summary_ar, v.lesson_en,
  v.lesson_ar, v.embedding::extensions.vector(384)
from (values
${recipeRows.join(",\n")}
) as v(slug, title_en, title_ar, theme, age_min, age_max, duration_minutes, book_slug, summary_en, summary_ar, lesson_en, lesson_ar, embedding)
left join public.books b on b.slug = v.book_slug
on conflict (slug) do update set
  title_en = excluded.title_en, title_ar = excluded.title_ar,
  theme = excluded.theme, age_min = excluded.age_min,
  age_max = excluded.age_max, duration_minutes = excluded.duration_minutes,
  book_id = excluded.book_id, summary_en = excluded.summary_en,
  summary_ar = excluded.summary_ar, lesson_en = excluded.lesson_en,
  lesson_ar = excluded.lesson_ar, embedding = excluded.embedding;
`);

  parts.push(`insert into public.profiles (slug, display_name_en, display_name_ar, age, avatar_emoji, xp)
values (${lit(profile.slug)}, ${lit(profile.displayNameEn)}, ${lit(profile.displayNameAr)}, ${profile.age}, ${lit(profile.avatarEmoji)}, ${profile.xp})
on conflict (slug) do update set
  display_name_en = excluded.display_name_en,
  display_name_ar = excluded.display_name_ar,
  age = excluded.age, avatar_emoji = excluded.avatar_emoji, xp = excluded.xp;
`);

  parts.push(`insert into public.badges
  (slug, name_en, name_ar, description_en, description_ar, icon, xp_required, sort_order)
values
${badges
  .map(
    (b) =>
      `  (${lit(b.slug)}, ${lit(b.nameEn)}, ${lit(b.nameAr)}, ${lit(b.descriptionEn)}, ${lit(b.descriptionAr)}, ${lit(b.icon)}, ${b.xpRequired}, ${b.sortOrder})`,
  )
  .join(",\n")}
on conflict (slug) do update set
  name_en = excluded.name_en, name_ar = excluded.name_ar,
  description_en = excluded.description_en, description_ar = excluded.description_ar,
  icon = excluded.icon, xp_required = excluded.xp_required,
  sort_order = excluded.sort_order;
`);

  parts.push(`insert into public.profile_badges (profile_id, badge_id)
select p.id, b.id
from public.profiles p
join public.badges b on b.slug in (${earnedBadges.map(lit).join(", ")})
where p.slug = ${lit(profile.slug)}
on conflict (profile_id, badge_id) do nothing;
`);

  parts.push(`insert into public.reading_logs (profile_id, book_id)
select p.id, bk.id
from public.profiles p
join public.books bk on bk.slug in (${loggedBooks.map(lit).join(", ")})
where p.slug = ${lit(profile.slug)}
on conflict (profile_id, book_id) do nothing;
`);

  return parts.join("\n");
}

const embeddings = await embedRecipes();
if (embeddings.length !== recipes.length || embeddings[0].length !== 384) {
  throw new Error(
    `Unexpected embedding shape: ${embeddings.length} x ${embeddings[0]?.length}`,
  );
}
const sql = buildSql(embeddings);
const outPath = new URL("../supabase/seed.sql", import.meta.url);
await writeFile(outPath, sql, "utf8");
console.log(`Wrote ${outPath.pathname} (${(sql.length / 1024).toFixed(0)} KB)`);

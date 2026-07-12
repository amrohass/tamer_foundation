import {
  books as seedBooks,
  libraries as seedLibraries,
  libraryBooks as seedLibraryBooks,
} from "@/supabase/seed-data.mts";
import { getSupabase } from "./supabase";
import type { Book, Library } from "./types";

const librarySelect =
  "id, slug, name_en, name_ar, city_en, city_ar, description_en, description_ar, lon, lat, " +
  "library_books(copies, book:books(id, slug, title_en, title_ar, author_en, author_ar, age_min, age_max, summary_en, summary_ar, cover_emoji, cover_color))";

type LibraryRow = Omit<Library, "books"> & {
  library_books: Array<{ copies: number; book: Book | null }>;
};

/**
 * All libraries with their available books, ordered by city. Falls back to
 * the bundled seed content when Supabase is unconfigured or unreachable, so
 * the map page always has data (CLAUDE.md §9).
 */
export async function getLibrariesWithBooks(): Promise<Library[]> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("libraries_map")
      .select(librarySelect)
      .order("city_en");
    if (!error && data && data.length > 0) {
      const rows = data as unknown as LibraryRow[];
      return rows.map(({ library_books, ...library }) => ({
        ...library,
        books: library_books.flatMap(({ copies, book }) =>
          book ? [{ copies, book }] : [],
        ),
      }));
    }
  }
  return librariesFromSeed();
}

function librariesFromSeed(): Library[] {
  const bookBySlug = new Map<string, Book>(
    seedBooks.map((b) => [
      b.slug,
      {
        id: b.slug,
        slug: b.slug,
        title_en: b.titleEn,
        title_ar: b.titleAr,
        author_en: b.authorEn,
        author_ar: b.authorAr,
        age_min: b.ageMin,
        age_max: b.ageMax,
        summary_en: b.summaryEn,
        summary_ar: b.summaryAr,
        cover_emoji: b.coverEmoji,
        cover_color: b.coverColor,
      },
    ]),
  );

  return [...seedLibraries]
    .sort((a, b) => a.cityEn.localeCompare(b.cityEn))
    .map((l) => ({
      id: l.slug,
      slug: l.slug,
      name_en: l.nameEn,
      name_ar: l.nameAr,
      city_en: l.cityEn,
      city_ar: l.cityAr,
      description_en: l.descriptionEn,
      description_ar: l.descriptionAr,
      lon: l.lon,
      lat: l.lat,
      books: (seedLibraryBooks[l.slug] ?? []).flatMap(([bookSlug, copies]) => {
        const book = bookBySlug.get(bookSlug);
        return book ? [{ copies, book }] : [];
      }),
    }));
}

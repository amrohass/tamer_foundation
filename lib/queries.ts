import {
  badges as seedBadges,
  books as seedBooks,
  earnedBadges as seedEarnedBadges,
  libraries as seedLibraries,
  libraryBooks as seedLibraryBooks,
  loggedBooks as seedLoggedBooks,
  profile as seedProfile,
} from "@/supabase/seed-data.mts";
import { getSupabase } from "./supabase";
import type {
  Badge,
  Book,
  Library,
  PassportData,
  Profile,
} from "./types";

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

const bookSelect =
  "id, slug, title_en, title_ar, author_en, author_ar, age_min, age_max, summary_en, summary_ar, cover_emoji, cover_color";

type ProfileRow = Profile & {
  profile_badges: Array<{ badge_id: string }>;
  reading_logs: Array<{ logged_at: string; book: Book | null }>;
};

/**
 * The demo child's passport: profile, badge statuses and reading log, plus
 * the pool of not-yet-logged books used by the simulated QR check-in.
 * Falls back to bundled seed content when Supabase is unavailable.
 */
export async function getPassportData(): Promise<PassportData> {
  const supabase = getSupabase();
  if (supabase) {
    const [profileRes, badgesRes, booksRes] = await Promise.all([
      supabase
        .from("profiles")
        .select(
          `id, slug, display_name_en, display_name_ar, age, avatar_emoji, xp, profile_badges(badge_id), reading_logs(logged_at, book:books(${bookSelect}))`,
        )
        .eq("slug", seedProfile.slug)
        .maybeSingle(),
      supabase.from("badges").select("*").order("sort_order"),
      supabase.from("books").select(bookSelect).order("title_en"),
    ]);

    if (
      !profileRes.error &&
      profileRes.data &&
      !badgesRes.error &&
      badgesRes.data &&
      badgesRes.data.length > 0 &&
      !booksRes.error &&
      booksRes.data
    ) {
      const row = profileRes.data as unknown as ProfileRow;
      const allBadges = badgesRes.data as Badge[];
      const allBooks = booksRes.data as Book[];
      const earnedIds = new Set(row.profile_badges.map((pb) => pb.badge_id));
      const loggedBooks = row.reading_logs
        .flatMap((log) => (log.book ? [log.book] : []))
        .sort((a, b) => a.title_en.localeCompare(b.title_en));
      const loggedIds = new Set(loggedBooks.map((b) => b.id));
      return {
        profile: {
          id: row.id,
          slug: row.slug,
          display_name_en: row.display_name_en,
          display_name_ar: row.display_name_ar,
          age: row.age,
          avatar_emoji: row.avatar_emoji,
          xp: row.xp,
        },
        badges: allBadges.map((badge) => ({
          ...badge,
          earned: earnedIds.has(badge.id),
        })),
        loggedBooks,
        unloggedBooks: allBooks.filter((b) => !loggedIds.has(b.id)),
      };
    }
  }
  return passportFromSeed();
}

function passportFromSeed(): PassportData {
  const allBooks = booksFromSeed();
  const loggedSlugs = new Set(seedLoggedBooks);
  const earnedSlugs = new Set(seedEarnedBadges);
  return {
    profile: {
      id: seedProfile.slug,
      slug: seedProfile.slug,
      display_name_en: seedProfile.displayNameEn,
      display_name_ar: seedProfile.displayNameAr,
      age: seedProfile.age,
      avatar_emoji: seedProfile.avatarEmoji,
      xp: seedProfile.xp,
    },
    badges: seedBadges.map((b) => ({
      id: b.slug,
      slug: b.slug,
      name_en: b.nameEn,
      name_ar: b.nameAr,
      description_en: b.descriptionEn,
      description_ar: b.descriptionAr,
      icon: b.icon,
      xp_required: b.xpRequired,
      sort_order: b.sortOrder,
      earned: earnedSlugs.has(b.slug),
    })),
    loggedBooks: allBooks.filter((b) => loggedSlugs.has(b.slug)),
    unloggedBooks: allBooks.filter((b) => !loggedSlugs.has(b.slug)),
  };
}

function booksFromSeed(): Book[] {
  return seedBooks.map((b) => ({
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
  }));
}

function librariesFromSeed(): Library[] {
  const bookBySlug = new Map<string, Book>(
    booksFromSeed().map((b) => [b.slug, b]),
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

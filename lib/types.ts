export type Book = {
  id: string;
  slug: string;
  title_en: string;
  title_ar: string;
  author_en: string;
  author_ar: string;
  age_min: number;
  age_max: number;
  summary_en: string;
  summary_ar: string;
  cover_emoji: string;
  cover_color: string;
};

export type LibraryBook = {
  copies: number;
  book: Book;
};

export type Profile = {
  id: string;
  slug: string;
  display_name_en: string;
  display_name_ar: string;
  age: number;
  avatar_emoji: string;
  xp: number;
};

export type Badge = {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  icon: string;
  xp_required: number;
  sort_order: number;
};

export type PassportBadge = Badge & { earned: boolean };

export type PassportData = {
  profile: Profile;
  badges: PassportBadge[];
  loggedBooks: Book[];
  unloggedBooks: Book[];
};

export type Library = {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  city_en: string;
  city_ar: string;
  description_en: string;
  description_ar: string;
  lon: number;
  lat: number;
  books: LibraryBook[];
};

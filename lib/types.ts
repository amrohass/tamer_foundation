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

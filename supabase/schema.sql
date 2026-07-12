-- Tamer Interactive Geo-Library — demonstration schema
-- Run this once in the Supabase SQL editor (before seed.sql).
-- Idempotent: safe to re-run.

create extension if not exists postgis with schema extensions;
create extension if not exists vector with schema extensions;
create extension if not exists pg_trgm with schema extensions;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.libraries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_en text not null,
  name_ar text not null,
  city_en text not null,
  city_ar text not null,
  description_en text not null,
  description_ar text not null,
  location extensions.geography(point, 4326) not null,
  created_at timestamptz not null default now()
);

create index if not exists libraries_location_idx
  on public.libraries using gist (location);

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_ar text not null,
  author_en text not null,
  author_ar text not null,
  age_min int not null,
  age_max int not null,
  summary_en text not null,
  summary_ar text not null,
  cover_emoji text not null,
  cover_color text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.library_books (
  library_id uuid not null references public.libraries(id) on delete cascade,
  book_id uuid not null references public.books(id) on delete cascade,
  copies int not null default 1,
  primary key (library_id, book_id)
);

create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_ar text not null,
  theme text not null,
  age_min int not null,
  age_max int not null,
  duration_minutes int not null,
  book_id uuid references public.books(id) on delete set null,
  summary_en text not null,
  summary_ar text not null,
  lesson_en text not null,
  lesson_ar text not null,
  embedding extensions.vector(384),
  created_at timestamptz not null default now()
);

create index if not exists recipes_embedding_idx
  on public.recipes using hnsw (embedding extensions.vector_cosine_ops);

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  display_name_en text not null,
  display_name_ar text not null,
  age int not null,
  avatar_emoji text not null,
  xp int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.badges (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_en text not null,
  name_ar text not null,
  description_en text not null,
  description_ar text not null,
  icon text not null,
  xp_required int not null,
  sort_order int not null default 0
);

create table if not exists public.profile_badges (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  badge_id uuid not null references public.badges(id) on delete cascade,
  earned_at timestamptz not null default now(),
  primary key (profile_id, badge_id)
);

create table if not exists public.reading_logs (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  book_id uuid not null references public.books(id) on delete cascade,
  logged_at timestamptz not null default now(),
  unique (profile_id, book_id)
);

-- ---------------------------------------------------------------------------
-- Row Level Security — the demo is read-only for the public anon key.
-- No insert/update/delete policies exist, so writes are impossible without
-- the service role key.
-- ---------------------------------------------------------------------------

alter table public.libraries enable row level security;
alter table public.books enable row level security;
alter table public.library_books enable row level security;
alter table public.recipes enable row level security;
alter table public.profiles enable row level security;
alter table public.badges enable row level security;
alter table public.profile_badges enable row level security;
alter table public.reading_logs enable row level security;

drop policy if exists "Public read access" on public.libraries;
create policy "Public read access" on public.libraries for select using (true);

drop policy if exists "Public read access" on public.books;
create policy "Public read access" on public.books for select using (true);

drop policy if exists "Public read access" on public.library_books;
create policy "Public read access" on public.library_books for select using (true);

drop policy if exists "Public read access" on public.recipes;
create policy "Public read access" on public.recipes for select using (true);

drop policy if exists "Public read access" on public.profiles;
create policy "Public read access" on public.profiles for select using (true);

drop policy if exists "Public read access" on public.badges;
create policy "Public read access" on public.badges for select using (true);

drop policy if exists "Public read access" on public.profile_badges;
create policy "Public read access" on public.profile_badges for select using (true);

drop policy if exists "Public read access" on public.reading_logs;
create policy "Public read access" on public.reading_logs for select using (true);

-- ---------------------------------------------------------------------------
-- Functions
-- ---------------------------------------------------------------------------

-- Semantic search: cosine similarity over precomputed recipe embeddings.
create or replace function public.match_recipes(
  query_embedding extensions.vector(384),
  match_count int default 6
)
returns table (
  id uuid,
  slug text,
  title_en text,
  title_ar text,
  theme text,
  age_min int,
  age_max int,
  duration_minutes int,
  book_id uuid,
  summary_en text,
  summary_ar text,
  lesson_en text,
  lesson_ar text,
  similarity double precision
)
language sql
stable
set search_path = public, extensions
as $$
  select
    r.id, r.slug, r.title_en, r.title_ar, r.theme,
    r.age_min, r.age_max, r.duration_minutes, r.book_id,
    r.summary_en, r.summary_ar, r.lesson_en, r.lesson_ar,
    1 - (r.embedding <=> query_embedding) as similarity
  from public.recipes r
  where r.embedding is not null
  order by r.embedding <=> query_embedding
  limit match_count;
$$;

-- Read-only view exposing library coordinates as plain lon/lat columns so
-- the app never parses binary geometry. security_invoker keeps RLS applied.
create or replace view public.libraries_map
with (security_invoker = true) as
select
  l.id, l.slug, l.name_en, l.name_ar, l.city_en, l.city_ar,
  l.description_en, l.description_ar,
  extensions.st_x(l.location::extensions.geometry) as lon,
  extensions.st_y(l.location::extensions.geometry) as lat
from public.libraries l;

-- Keyword fallback: trigram similarity over bilingual recipe text, used when
-- no query embedding can be produced. Keeps search working with zero
-- external dependencies.
create or replace function public.search_recipes_keyword(
  q text,
  match_count int default 6
)
returns table (
  id uuid,
  slug text,
  title_en text,
  title_ar text,
  theme text,
  age_min int,
  age_max int,
  duration_minutes int,
  book_id uuid,
  summary_en text,
  summary_ar text,
  lesson_en text,
  lesson_ar text,
  similarity double precision
)
language sql
stable
set search_path = public, extensions
as $$
  select
    r.id, r.slug, r.title_en, r.title_ar, r.theme,
    r.age_min, r.age_max, r.duration_minutes, r.book_id,
    r.summary_en, r.summary_ar, r.lesson_en, r.lesson_ar,
    greatest(
      extensions.word_similarity(q, r.title_en || ' ' || r.theme || ' ' || r.summary_en || ' ' || r.lesson_en),
      extensions.word_similarity(q, r.title_ar || ' ' || r.summary_ar || ' ' || r.lesson_ar)
    )::double precision as similarity
  from public.recipes r
  order by similarity desc
  limit match_count;
$$;

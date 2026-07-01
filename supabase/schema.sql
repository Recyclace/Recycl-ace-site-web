-- ============================================================
--  RECYCL'ACE — Schéma Supabase
--  À exécuter dans Supabase > SQL Editor
-- ============================================================

-- Produits
create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name_fr     text not null,
  name_en     text not null,
  price       numeric(10,2) not null,
  category_fr text,
  category_en text,
  description_fr text,
  description_en text,
  materials_fr text,
  materials_en text,
  active      boolean default true,
  created_at  timestamptz default now()
);

-- Variantes de couleur (avec galerie d'images)
create table if not exists public.product_colors (
  id         uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete cascade,
  name_fr    text not null,
  name_en    text not null,
  hex        text not null,
  images     text[] default '{}',
  position   int default 0
);

-- Clubs partenaires (carte)
create table if not exists public.clubs (
  id    uuid primary key default gen_random_uuid(),
  name  text not null,
  city  text,
  lat   double precision,
  lng   double precision
);

-- Demandes B2B clubs
create table if not exists public.club_requests (
  id         uuid primary key default gen_random_uuid(),
  club       text not null,
  contact    text not null,
  phone      text,
  email      text not null,
  message    text,
  created_at timestamptz default now()
);

-- Messages de contact
create table if not exists public.contacts (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  subject    text,
  message    text,
  created_at timestamptz default now()
);

-- ============================================================
--  Row Level Security
-- ============================================================
alter table public.products       enable row level security;
alter table public.product_colors enable row level security;
alter table public.clubs          enable row level security;
alter table public.club_requests  enable row level security;
alter table public.contacts       enable row level security;

-- Lecture publique du catalogue & clubs
create policy "public read products"  on public.products       for select using (true);
create policy "public read colors"    on public.product_colors for select using (true);
create policy "public read clubs"     on public.clubs          for select using (true);

-- Insertion publique des formulaires (leads)
create policy "public insert club_requests" on public.club_requests for insert with check (true);
create policy "public insert contacts"      on public.contacts      for insert with check (true);

-- NB : l'écriture sur products/colors se fait via la clé service_role
--      (espace admin côté serveur). Ne jamais exposer la service_role au navigateur.

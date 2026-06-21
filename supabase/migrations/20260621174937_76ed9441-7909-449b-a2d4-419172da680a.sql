
-- Roles
create type public.app_role as enum ('admin', 'user');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "profiles read own" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "profiles update own" on public.profiles for update to authenticated using (auth.uid() = id);
create policy "profiles insert own" on public.profiles for insert to authenticated with check (auth.uid() = id);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  unique(user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "user_roles read own" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

-- Profile auto-create trigger
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email,'@',1)))
  on conflict (id) do nothing;
  return new;
end; $$;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Categories
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  tagline text,
  description text,
  hero_image text,
  seo_title text,
  seo_description text,
  seo_keywords text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.categories to anon, authenticated;
grant all on public.categories to service_role;
alter table public.categories enable row level security;
create policy "categories public read" on public.categories for select to anon, authenticated using (true);
create policy "categories admin write" on public.categories for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Products
create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category_id uuid not null references public.categories(id) on delete restrict,
  name text not null,
  brand text,
  short_description text,
  description text not null,
  price numeric(10,2) not null,
  currency text not null default 'USD',
  stock int not null default 0,
  images text[] not null default '{}',
  rating_avg numeric(3,2) not null default 0,
  rating_count int not null default 0,
  featured boolean not null default false,
  faq jsonb not null default '[]'::jsonb,
  seo_title text,
  seo_description text,
  seo_keywords text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.products to anon, authenticated;
grant all on public.products to service_role;
alter table public.products enable row level security;
create policy "products public read" on public.products for select to anon, authenticated using (true);
create policy "products admin write" on public.products for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create index on public.products(category_id);

-- Reviews
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null,
  rating int not null check (rating between 1 and 5),
  title text,
  body text,
  created_at timestamptz not null default now()
);
grant select on public.reviews to anon, authenticated;
grant insert on public.reviews to authenticated;
grant all on public.reviews to service_role;
alter table public.reviews enable row level security;
create policy "reviews public read" on public.reviews for select to anon, authenticated using (true);
create policy "reviews insert own" on public.reviews for insert to authenticated with check (auth.uid() = user_id);
create policy "reviews admin write" on public.reviews for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create index on public.reviews(product_id);

-- Blog posts
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  body_md text not null,
  cover_image text,
  category_id uuid references public.categories(id) on delete set null,
  author text not null default 'Lumen & Oud Editors',
  published_at timestamptz not null default now(),
  read_minutes int not null default 5,
  seo_title text,
  seo_description text,
  seo_keywords text,
  created_at timestamptz not null default now()
);
grant select on public.posts to anon, authenticated;
grant all on public.posts to service_role;
alter table public.posts enable row level security;
create policy "posts public read" on public.posts for select to anon, authenticated using (true);
create policy "posts admin write" on public.posts for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Business info (single row for LocalBusiness schema + contact page)
create table public.business_info (
  id int primary key default 1 check (id = 1),
  name text not null,
  legal_name text,
  description text,
  email text,
  phone text,
  street text,
  city text,
  region text,
  postal_code text,
  country text,
  lat numeric,
  lng numeric,
  map_embed_url text,
  hours jsonb not null default '[]'::jsonb,
  social jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
grant select on public.business_info to anon, authenticated;
grant all on public.business_info to service_role;
alter table public.business_info enable row level security;
create policy "business public read" on public.business_info for select to anon, authenticated using (true);
create policy "business admin write" on public.business_info for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- SEO overrides
create table public.seo_meta (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_key text not null,
  title text,
  description text,
  keywords text,
  og_image text,
  updated_at timestamptz not null default now(),
  unique(entity_type, entity_key)
);
grant select on public.seo_meta to anon, authenticated;
grant all on public.seo_meta to service_role;
alter table public.seo_meta enable row level security;
create policy "seo_meta public read" on public.seo_meta for select to anon, authenticated using (true);
create policy "seo_meta admin write" on public.seo_meta for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Redirects
create table public.seo_redirects (
  id uuid primary key default gen_random_uuid(),
  from_path text not null unique,
  to_path text not null,
  status int not null default 301 check (status in (301, 302)),
  created_at timestamptz not null default now()
);
grant select on public.seo_redirects to anon, authenticated;
grant all on public.seo_redirects to service_role;
alter table public.seo_redirects enable row level security;
create policy "redirects public read" on public.seo_redirects for select to anon, authenticated using (true);
create policy "redirects admin write" on public.seo_redirects for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- updated_at helper
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;
create trigger products_touch before update on public.products for each row execute function public.touch_updated_at();
create trigger business_touch before update on public.business_info for each row execute function public.touch_updated_at();
create trigger seo_meta_touch before update on public.seo_meta for each row execute function public.touch_updated_at();

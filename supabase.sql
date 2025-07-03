-- Supabase schema for ReviveForge
-- 1. Profiles (extends auth.users)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  stripe_account_id text,
  user_type text check (user_type in ('buyer', 'seller')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Projects
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid references profiles(id) on delete set null,
  title text not null,
  description text,
  github_url text,
  tech_stack text[],
  health_score int,
  value_min int,
  value_max int,
  ai_analysis jsonb,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. Offers
create table if not exists offers (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid references profiles(id) on delete set null,
  project_id uuid references projects(id) on delete cascade,
  amount int not null,
  status text check (status in ('pending', 'accepted', 'rejected')) default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. Transactions
create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  offer_id uuid references offers(id) on delete cascade,
  stripe_payment_intent_id text,
  status text,
  created_at timestamptz default now()
);

-- 5. Favorites
create table if not exists favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  created_at timestamptz default now()
);

-- 6. Subscriptions
create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  stripe_subscription_id text,
  status text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS Policies
-- Profiles: only owner can read/write their row
alter table profiles enable row level security;
create policy "Owner can access own profile" on profiles
  for all using (auth.uid() = id);

-- Projects: public read, only seller can insert/update/delete their own
alter table projects enable row level security;
create policy "Public can read projects" on projects for select using (true);
create policy "Seller can modify own projects" on projects
  for all using (auth.uid() = seller_id);

-- Offers: buyer can insert; seller can read offers on their projects
alter table offers enable row level security;
create policy "Buyer can insert offers" on offers for insert using (auth.uid() = buyer_id);
create policy "Seller can read offers on their projects" on offers for select using (
  exists (select 1 from projects p where p.id = project_id and p.seller_id = auth.uid())
  or buyer_id = auth.uid()
);

-- Transactions: only relevant user can read
alter table transactions enable row level security;
create policy "Relevant user can read transactions" on transactions for select using (
  exists (select 1 from offers o where o.id = offer_id and (o.buyer_id = auth.uid() or
    exists (select 1 from projects p where p.id = o.project_id and p.seller_id = auth.uid()))
  )
);

-- Subscriptions: only relevant user can read
alter table subscriptions enable row level security;
create policy "Relevant user can read subscriptions" on subscriptions for select using (user_id = auth.uid());

-- Favorites: only owner can insert/delete, public cannot read
alter table favorites enable row level security;
create policy "Owner can modify favorites" on favorites for all using (user_id = auth.uid());

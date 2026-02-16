-- Create comments table
create table if not exists comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid not null references posts(id) on delete cascade,
  parent_id uuid references comments(id) on delete cascade,
  author_name text not null,
  author_email text,
  content text not null,
  is_approved boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table comments enable row level security;

-- Policies
-- Anyone can read approved comments
create policy "Public comments are viewable by everyone"
  on comments for select
  using (is_approved = true);

-- Anyone can insert a comment
create policy "Anyone can insert a comment"
  on comments for insert
  with check (true);

-- Only authenticated users (admins) can update/delete comments
create policy "Admins can update comments"
  on comments for update
  using (auth.role() = 'authenticated');

create policy "Admins can delete comments"
  on comments for delete
  using (auth.role() = 'authenticated');

-- Realtime (optional, enables real-time updates for comments)
alter publication supabase_realtime add table comments;

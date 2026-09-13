/*
# Create guides table for guide registration and profile

1. New Tables
- `guides`
  - `id` (uuid, primary key)
  - `user_id` (uuid, not null, defaults to auth.uid(), references auth.users)
  - `full_name` (text, not null) — the guide's display name
  - `city` (text, not null) — the city/region where the guide operates
  - `languages` (text[], not null default '{}') — languages the guide speaks
  - `specialties` (text[], not null default '{}') — areas of expertise (Food, Religious, Historical, etc.)
  - `experience_years` (integer, not null default 0) — years of guiding experience
  - `bio` (text, nullable) — short bio / description
  - `verified` (boolean, not null default false) — admin verification status (NOT user-editable via normal flow)
  - `created_at` (timestamptz, defaults to now())

2. Security
- Enable RLS on `guides`.
- Owner-scoped CRUD: each authenticated user can only access their own guide profile.
- 4 separate policies (SELECT, INSERT, UPDATE, DELETE) scoped TO authenticated.
- `user_id` defaults to `auth.uid()` so inserts that omit it still pass the WITH CHECK.

3. Notes
- A guide registers after logging in / signing up via the guide login page.
- The `verified` column is set to false by default and is intended to be toggled by an admin, not by the guide themselves.
- Each guide sees only their own profile data.
*/

CREATE TABLE IF NOT EXISTS guides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  city text NOT NULL,
  languages text[] NOT NULL DEFAULT '{}',
  specialties text[] NOT NULL DEFAULT '{}',
  experience_years integer NOT NULL DEFAULT 0,
  bio text,
  verified boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE guides ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_guide" ON guides;
CREATE POLICY "select_own_guide" ON guides FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_guide" ON guides;
CREATE POLICY "insert_own_guide" ON guides FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_guide" ON guides;
CREATE POLICY "update_own_guide" ON guides FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_guide" ON guides;
CREATE POLICY "delete_own_guide" ON guides FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

/*
# Create trips table for traveller trip preferences

1. New Tables
- `trips`
  - `id` (uuid, primary key)
  - `user_id` (uuid, not null, defaults to auth.uid(), references auth.users)
  - `location` (text, not null) — the city/region the traveller wants to visit
  - `interests` (text[], not null) — selected interests like Food, Religious, Historical
  - `created_at` (timestamptz, defaults to now())

2. Security
- Enable RLS on `trips`.
- Owner-scoped CRUD: each authenticated user can only access their own trips.
- 4 separate policies (SELECT, INSERT, UPDATE, DELETE) scoped TO authenticated.
- `user_id` defaults to `auth.uid()` so inserts that omit it still pass the WITH CHECK.

3. Notes
- This table stores trip preferences submitted by travellers after they log in.
- Each traveller sees only their own trips.
*/

CREATE TABLE IF NOT EXISTS trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  location text NOT NULL,
  interests text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE trips ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_trips" ON trips;
CREATE POLICY "select_own_trips" ON trips FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_trips" ON trips;
CREATE POLICY "insert_own_trips" ON trips FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_trips" ON trips;
CREATE POLICY "update_own_trips" ON trips FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_trips" ON trips;
CREATE POLICY "delete_own_trips" ON trips FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

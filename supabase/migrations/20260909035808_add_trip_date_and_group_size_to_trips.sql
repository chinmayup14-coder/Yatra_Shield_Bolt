/*
# Add trip_date and group_size columns to trips table

1. Modified Tables
- `trips`
  - `trip_date` (date, nullable) — the planned travel date for the trip
  - `group_size` (integer, nullable, default 1) — number of travellers in the group

2. Security
- No changes to existing RLS policies. The new columns are covered by the existing
  owner-scoped INSERT/UPDATE policies since they use `auth.uid() = user_id`.

3. Notes
- These columns support the new "Book a Guide" feature from the PlaceDetail modal,
  where travellers specify a travel date and group size when requesting a guide
  for a specific destination.
- Both columns are nullable so existing trip records are not affected.
*/

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'trips' AND column_name = 'trip_date'
  ) THEN
    ALTER TABLE trips ADD COLUMN trip_date date;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'trips' AND column_name = 'group_size'
  ) THEN
    ALTER TABLE trips ADD COLUMN group_size integer DEFAULT 1;
  END IF;
END $$;

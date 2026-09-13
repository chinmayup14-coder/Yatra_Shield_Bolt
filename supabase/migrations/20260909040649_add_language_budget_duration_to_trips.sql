/*
# Add language, budget, and duration columns to trips table

1. Modified Tables
- `trips`
  - `language` (text, nullable) — preferred guide language (e.g. English, Hindi)
  - `budget` (text, nullable) — budget tier: budget, mid-range, luxury
  - `duration` (text, nullable) — trip duration selection (e.g. 1-3 days, 4-7 days)

2. Security
- No changes to existing RLS policies. New columns are covered by existing
  owner-scoped INSERT/UPDATE policies.

3. Notes
- These columns support the enhanced Trip Planner form, which now collects
  language preference, budget tier, and trip duration alongside location,
  date, group size, and interests.
- All new columns are nullable so existing trip records are not affected.
*/

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'trips' AND column_name = 'language'
  ) THEN
    ALTER TABLE trips ADD COLUMN language text;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'trips' AND column_name = 'budget'
  ) THEN
    ALTER TABLE trips ADD COLUMN budget text;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'trips' AND column_name = 'duration'
  ) THEN
    ALTER TABLE trips ADD COLUMN duration text;
  END IF;
END $$;

BEGIN;
CREATE TABLE IF NOT EXISTS app_users (
  id text PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS plants (
  user_id text NOT NULL REFERENCES app_users(id),
  id uuid NOT NULL,
  data jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, id)
);
CREATE INDEX IF NOT EXISTS plants_user_updated_idx ON plants(user_id, updated_at DESC);
COMMIT;

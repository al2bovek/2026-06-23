CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT         NOT NULL,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categories (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(120) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS items (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(200) NOT NULL,
  type        VARCHAR(80)  NOT NULL,
  description TEXT         NOT NULL DEFAULT '',
  image_url   TEXT         NOT NULL DEFAULT '',
  address     VARCHAR(255) NOT NULL DEFAULT '',
  rating      NUMERIC(2,1) NOT NULL DEFAULT 0,
  is_free     BOOLEAN      NOT NULL DEFAULT FALSE,
  category_id INTEGER      NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_items_category_id ON items(category_id);
CREATE INDEX IF NOT EXISTS idx_items_type        ON items(type);

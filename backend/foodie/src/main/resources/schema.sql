CREATE TABLE IF NOT EXISTS properties
(
  id      INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name    TEXT    NOT NULL,
  unit_id INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS ingredients
(
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT    NOT NULL,
  serving_size INTEGER NOT NULL,
  unit_id      INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS ingredient_properties
(
  id            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ingredient_id uuid    NOT NULL,
  property_id   INTEGER NOT NULL,
  value         INTEGER NOT NULL,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients (id),
  FOREIGN KEY (property_id) REFERENCES properties (id),
  UNIQUE (ingredient_id, property_id)
)

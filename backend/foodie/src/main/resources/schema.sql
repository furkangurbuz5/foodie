CREATE TABLE IF NOT EXISTS properties
(
  id       INTEGER PRIMARY KEY,
  name     TEXT NOT NULL,
  unit     TEXT NOT NULL,
  category TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ingredient
(
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT    NOT NULL,
  properties_id INTEGER NOT NULL,

  CONSTRAINT fk_ingredient_properties
    FOREIGN KEY (properties_id)
      REFERENCES properties (id)
      ON UPDATE CASCADE
      ON DELETE RESTRICT
);

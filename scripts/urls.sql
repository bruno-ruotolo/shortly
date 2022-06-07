CREATE TABLE urls (
  id serial NOT NULL PRIMARY KEY,
  url text NOT NULL,
  "shortURL" text NOT NULL UNIQUE
);
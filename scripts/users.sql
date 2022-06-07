CREATE TABLE users (
  id serial NOT NULL PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  password text NOT NULL,
  "linksCount" integer NOT NULL DEFAULT 0,
  "visitsCount" integer NOT NULL DEFAULT 0,
  "createdAt" timestamp NOT NULL DEFAULT NOW()
);
CREATE TABLE tokens (
  id serial NOT NULL PRIMARY KEY,
  token text NOT NULL UNIQUE,
  "createdAt" timestamp NOT NULL DEFAULT NOW(),
  status boolean NOT NULL
);
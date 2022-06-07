CREATE TABLE tokens (
  id serial NOT NULL PRIMARY KEY,
  tokens text NOT NULL UNIQUE,
  "createdAt" timestamp NOT NULL DEFAULT NOW(),
  status boolean NOT NULL
);
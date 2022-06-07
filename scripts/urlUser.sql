CREATE TABLE "urlUser" (
  id serial NOT NULL PRIMARY KEY,
  "userId" integer NOT NULL REFERENCES users(id),
  "urlId" integer NOT NULL REFERENCES urls(id),
  "visitCount" integer NOT NULL DEFAULT 0,
  "createdAt" timestamp NOT NULL DEFAULT NOW()
);
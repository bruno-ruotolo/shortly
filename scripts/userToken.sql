CREATE TABLE "userToken" (
  id serial NOT NULL PRIMARY KEY,
  "userId" integer NOT NULL REFERENCES users(id),
  "tokenId" integer NOT NULL REFERENCES tokens(id)
);
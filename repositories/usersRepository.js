import db from "../db.js";

async function getUser(id) {
  return db.query(
    `SELECT 
    us.id, us.name, COALESCE(SUM(ur."visitCount")::INTEGER, 0) as "visitCount"
    FROM 
      users as us
      LEFT JOIN urls as ur ON ur."userId" = us.id
    WHERE 
      us.id = $1
    GROUP BY us.id`
    , [id]
  );
};

async function getUserShortenURL(id) {
  return db.query(
    `SELECT 
      id, "shortUrl", url, "visitCount"
    FROM 
      urls
    WHERE "userId" = $1
    ORDER BY id`
    , [id]
  );
};

export const usersRepository = {
  getUser,
  getUserShortenURL
}


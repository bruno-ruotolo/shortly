import db from "../db.js";

async function postURL(userId, url, shortUrl) {
  return db.query(
    `INSERT INTO 
      urls ("userId" ,url, "shortUrl") 
    VALUES 
      ($1, $2, $3)`,
    [userId, url, shortUrl]
  );
};

async function getURL(id) {
  return db.query(
    `SELECT id, "shortUrl", url FROM urls WHERE id = $1`, [id]
  );
};

async function selectOpenURL(shortUrl) {
  const whereClause = `WHERE "shortUrl" = $1`;
  return db.query(
    `SELECT url FROM urls ${whereClause}`, [shortUrl]
  );
};

async function insertOpenURL(shortUrl) {
  const whereClause = `WHERE "shortUrl" = $1`;
  return db.query(
    `UPDATE urls SET "visitCount" = "visitCount" + 1 ${whereClause}`, [shortUrl]
  );
};

async function selectDeleteURL(id) {
  return db.query(
    `SELECT * FROM urls WHERE id = $1`, [id]
  );
};

async function deleteURL(id) {
  return db.query(`DELETE FROM urls WHERE id = $1`, [id]);
};

export const urlsRepository = {
  postURL,
  getURL,
  selectOpenURL,
  insertOpenURL,
  selectDeleteURL,
  deleteURL
};
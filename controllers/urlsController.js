import chalk from "chalk";
import { nanoid } from 'nanoid'

import db from "../db.js";

export async function postURL(req, res) {
  const { tokensResult: { userId } } = res.locals;
  const { url } = req.body;
  const shortUrl = nanoid(6);

  try {
    await db.query(
      `INSERT INTO 
        urls ("userId" ,url, "shortUrl") 
      VALUES 
        ($1, $2, $3)`,
      [userId, url, shortUrl]
    );

    res.status(201).send({ shortUrl });
  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
}

export async function getURL(req, res) {
  const { id } = req.params;

  try {
    const urlsResult = await db.query(
      `SELECT id, "shortUrl", url FROM urls WHERE id = $1`, [id]
    );

    if (urlsResult.rowCount === 0) return res.sendStatus(404);

    const url = urlsResult.rows[0];
    res.status(200).send(url);
  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
}

export async function openURL(req, res) {
  const { shortUrl } = req.params;

  const whereClause = `WHERE "shortUrl" = $1`;

  try {
    const urlsResult = await db.query(
      `SELECT url FROM urls ${whereClause}`, [shortUrl]
    );

    if (urlsResult.rowCount === 0) return res.sendStatus(404);

    await db.query(
      `UPDATE urls SET "visitCount" = "visitCount" + 1 ${whereClause}`, [shortUrl]
    );

    const { url } = urlsResult.rows[0];
    res.redirect(url);
  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
}

export async function deleteURL(req, res) {
  const { tokensResult: { userId } } = res.locals;
  const { id } = req.params;

  try {
    const urlsResult = await db.query(
      `SELECT * FROM urls WHERE id = $1`, [id]
    )

    if (urlsResult.rowCount === 0) return res.sendStatus(404);

    const { userId: urlUserId } = urlsResult.rows[0];
    if (urlUserId !== userId) return res.sendStatus(401);

    await db.query(`DELETE FROM urls WHERE id = $1`, [id]);
    res.sendStatus(204)
  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
}

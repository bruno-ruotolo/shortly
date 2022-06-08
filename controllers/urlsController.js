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


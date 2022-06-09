import chalk from "chalk";

import db from "../db.js";

export async function getUser(req, res) {
  const { tokensResult: { userId } } = res.locals;
  const { id } = req.params;
  console.log(userId, id)

  try {
    const usersResult = await db.query(
      `SELECT 
      us.id, us.name, SUM(ur."visitCount") as "visitCount"
      FROM 
        users as us
        LEFT JOIN urls as ur ON ur."userId" = us.id
      WHERE 
        us.id = $1
      GROUP BY us.id`
      , [id]
    );

    if (usersResult.rowCount === 0) return res.sendStatus(404);
    if (userId !== parseInt(id)) return res.sendStatus(401);

    const shortenUrlResult = await db.query(
      `SELECT 
        id, "shortUrl", url, "visitCount"
      FROM 
        urls
      WHERE "userId" = $1`
      , [id]
    );

    res.status(200).send(createJSONUrl(usersResult, shortenUrlResult));
  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
}

function createJSONUrl(user, urls) {
  const { id, name, visitCount } = user.rows[0];
  const shortenedUrls = [];

  urls.rows.map(obj => {
    const { id, shortUrl, url, visitCount } = obj
    shortenedUrls.push({ id, shortUrl, url, visitCount });
  });

  const userReturn = {
    id, name, visitCount: visitCount || 0, shortenedUrls
  }

  return (userReturn);
}

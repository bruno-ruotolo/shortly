import chalk from "chalk";

import db from "../db.js";

export async function getRanking(req, res) {

  try {
    const rankingResult = await db.query(
      `SELECT 
        us.id, 
        us.name, 
        COUNT(ur."id") as "linksCount", 
        SUM(ur."visitCount") as "visitCount" 
      FROM 
        users us
        JOIN urls ur ON ur."userId" = us.id
      GROUP BY 
        us.id
      ORDER BY 
        "visitCount" DESC
      LIMIT 10`
    );

    const ranking = rankingResult.rows;
    res.status(200).send(ranking)
  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
}
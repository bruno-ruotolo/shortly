import chalk from "chalk";

import { rankingRepository } from "../repositories/rankingRepository.js";

export async function getRanking(req, res) {

  try {
    const rankingResult = await rankingRepository.getRanking();
    const ranking = rankingResult.rows

    res.status(200).send(ranking);
  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
}
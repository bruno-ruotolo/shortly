import chalk from "chalk";
import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";

import usersRouter from "./routers/usersRouter.js";

const app = express();
app.use(json());
app.use(cors());
dotenv.config();

app.use(usersRouter);


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(chalk.green.bold("Server ON Port " + port));
});
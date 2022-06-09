import chalk from "chalk";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import db from "../db.js";

export async function signIn(req, res) {
  const signIn = req.body;
  const { email, password } = signIn

  try {
    const usersResult = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if (!(usersResult.rowCount > 0 && bcrypt.compareSync(password, usersResult.rows[0].password))) {
      return res.sendStatus(401)
    };

    const { id: userId } = usersResult.rows[0];

    const secretKey = process.env.JWT_SECRET;
    const expire = { expiresIn: 60 * 60 * 24 * 30 };
    const token = jwt.sign(signIn, secretKey, expire);

    await db.query(
      `INSERT INTO 
        tokens ("userId",token, status) 
      VALUES 
        ($1, $2, $3)`,
      [userId, token, true]
    );

    res.status(200).send(token);
  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
}

export async function signUp(req, res) {
  const signUp = req.body;
  const { name, email, password } = signUp;

  try {
    const usersResult = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if (usersResult.rowCount > 0) return res.sendStatus(409);

    const passwordHash = bcrypt.hashSync(password, 10);

    await db.query(
      `INSERT INTO users (name, email, password) VALUES ($1,$2,$3)`,
      [name, email, passwordHash]);

    res.sendStatus(201);
  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
}
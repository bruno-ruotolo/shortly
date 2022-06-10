import { Router } from "express";

import { signIn, signUp } from "../controllers/authController.js";
import { schemaValidate } from "../middlewares/schemaValidate.js";

const authRouter = Router();

authRouter.post("/signin", schemaValidate, signIn);
authRouter.post("/signup", schemaValidate, signUp);

export default authRouter;
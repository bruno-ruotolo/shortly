import { Router } from "express";

import { signIn, signUp } from "../controllers/authController.js";
import { postSignIn, postSignUp } from "../middlewares/authValidate.js";

const authRouter = Router();

authRouter.post("/signin", postSignIn, signIn);
authRouter.post("/signup", postSignUp, signUp);

export default authRouter;
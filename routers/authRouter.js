import { Router } from "express";

import { signIn, signUp } from "../controllers/authController.js";
import { postSignIn, postSignUp } from "../middlewares/authValidate.js";

const usersRouter = Router();

usersRouter.post("/signin", postSignIn, signIn);
usersRouter.post("/signup", postSignUp, signUp);

export default usersRouter;
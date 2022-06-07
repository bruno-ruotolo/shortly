import { Router } from "express";

import { signIn, signUp } from "../controllers/usersController.js";
import { postSignIn, postSignUp } from "../middlewares/usersValidate.js";

const usersRouter = Router();

usersRouter.post("/signin", postSignIn, signIn);
usersRouter.post("/signup", postSignUp, signUp);

export default usersRouter;
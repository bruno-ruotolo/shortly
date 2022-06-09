import { Router } from "express";

import { getUser } from "../controllers/usersController.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";

const usersRouter = Router();

usersRouter.get("/users/:id", tokenMiddleware, getUser);

export default usersRouter;
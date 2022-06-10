import { Router } from "express";


import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";
import { schemaValidate } from "../middlewares/schemaValidate.js";
import { deleteURL, getURL, openURL, postURL } from "../controllers/urlsController.js";


const urlRouter = Router();

urlRouter.post("/urls/shorten", tokenMiddleware, schemaValidate, postURL);
urlRouter.get("/urls/:id", getURL);
urlRouter.get("/urls/open/:shortUrl", openURL);
urlRouter.delete("/urls/:id", tokenMiddleware, deleteURL);

export default urlRouter;
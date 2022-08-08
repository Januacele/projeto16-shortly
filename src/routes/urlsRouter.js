import {Router} from 'express';
import { shortenUrl, getShortUrl } from '../controllers/urlsController.js';
import { checkToken, checkUrlSchema, shortUrlExist } from '../middlewares/urlsMiddleware.js';

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", checkToken, checkUrlSchema, shortenUrl);
urlsRouter.get("/urls/:id", shortUrlExist, getShortUrl)

export default urlsRouter;
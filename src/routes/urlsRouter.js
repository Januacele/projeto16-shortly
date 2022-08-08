import {Router} from 'express';
import { shortenUrl, getShortUrl, redirect } from '../controllers/urlsController.js';
import { checkToken, checkUrlSchema, checkShortUrlById, checkShortUrlExist } from '../middlewares/urlsMiddleware.js';

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", checkToken, checkUrlSchema, shortenUrl);
urlsRouter.get("/urls/:id", checkShortUrlById, getShortUrl);
urlsRouter.get("/urls/open/:shortUrl", checkShortUrlExist, redirect);

export default urlsRouter;
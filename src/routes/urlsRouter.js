import {Router} from 'express';
import { shortenUrl, getShortUrl, redirect, deleteUrl } from '../controllers/urlsController.js';
import { 
    checkToken, 
    checkUrlSchema, 
    checkShortUrlById, 
    checkShortUrlExist, 
    checkUrlUser } 
    from '../middlewares/urlsMiddleware.js';

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", checkToken, checkUrlSchema, shortenUrl);
urlsRouter.get("/urls/:id", checkShortUrlById, getShortUrl);
urlsRouter.get("/urls/open/:shortUrl", checkShortUrlExist, redirect);
urlsRouter.delete("/urls/:id", checkToken, checkShortUrlById, checkUrlUser, deleteUrl )

export default urlsRouter;
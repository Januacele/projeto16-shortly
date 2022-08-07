import {Router} from 'express';
import { shortenUrl } from '../controllers/urlsController.js';
import { checkToken, checkUrlSchema } from '../middlewares/urlsMiddleware.js';

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", checkToken, checkUrlSchema, shortenUrl);


export default urlsRouter;
import {Router} from 'express';
import { shortenUrl } from '../controllers/urlsController.js';
import { checkToken, checkUrlSchema } from '../middlewares/urlsMiddleware.js';
import timeout from 'connect-timeout';

const urlsRouter = Router();
const time = timeout(); 

urlsRouter.post("/urls/shorten", time('5s'), checkToken, checkUrlSchema, shortenUrl);


export default urlsRouter;
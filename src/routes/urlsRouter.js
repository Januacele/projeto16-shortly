import {Router} from 'express';
import {  } from '../controllers/urlsController.js';
import { checkToken, checkUrlSchema } from '../middlewares/urlsMiddleware.js';


const urlsRouter = Router();


urlsRouter.post("/urls/shorten", checkToken, checkUrlSchema );


export default urlsRouter;
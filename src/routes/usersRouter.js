import {Router} from 'express';
import { register } from '../controllers/usersController.js';
import { checkSignUp } from '../middlewares/usersMiddleware.js';


const usersRouter = Router();


usersRouter.post("/signup", checkSignUp, register);


export default usersRouter;
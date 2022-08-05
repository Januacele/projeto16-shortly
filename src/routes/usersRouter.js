import {Router} from 'express';
import { registerNewUser, login } from '../controllers/usersController.js';
import { 
        checkSignUpSchema,
        checkConfirmPassword,
        checkUniqueEmail,
        checkSignInSchema, 
        checkUserEmail,
        checkUserPassword
    } 
        from '../middlewares/usersMiddleware.js';


const usersRouter = Router();


usersRouter.post("/signup", checkSignUpSchema, checkConfirmPassword, checkUniqueEmail, registerNewUser);
usersRouter.post("/signin", checkSignInSchema, checkUserEmail, checkUserPassword, login);

export default usersRouter;
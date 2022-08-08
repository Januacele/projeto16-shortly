import {Router} from 'express';
import { registerNewUser, login, getUserData } from '../controllers/usersController.js';
import { 
        checkSignUpSchema,
        checkConfirmPassword,
        checkUniqueEmail,
        checkSignInSchema, 
        checkUserEmail,
        checkUserPassword,
        checkUserId,
        checkUserUrl
    } 
        from '../middlewares/usersMiddleware.js';
import {checkToken} from '../middlewares/urlsMiddleware.js';

const usersRouter = Router();


usersRouter.post("/signup", checkSignUpSchema, checkConfirmPassword, checkUniqueEmail, registerNewUser);
usersRouter.post("/signin", checkSignInSchema, checkUserEmail, checkUserPassword, login);
usersRouter.get("/users/me", checkToken, checkUserId, checkUserUrl, getUserData)

export default usersRouter;
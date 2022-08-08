import {Router} from 'express';
import { registerNewUser, login, getUserData, getRanking } from '../controllers/usersController.js';
import { 
        checkSignUpSchema,
        checkConfirmPassword,
        checkUniqueEmail,
        checkSignInSchema, 
        checkUserEmail,
        checkUserPassword,
        checkTokenIsFromUser,
        checkUserId,
        checkUserUrl
    } 
        from '../middlewares/usersMiddleware.js';
import {checkToken} from '../middlewares/urlsMiddleware.js';

const usersRouter = Router();


usersRouter.post("/signup", checkSignUpSchema, checkConfirmPassword, checkUniqueEmail, registerNewUser);
usersRouter.post("/signin", checkSignInSchema, checkUserEmail, checkUserPassword, login);
usersRouter.get("/users/:id", checkToken,checkTokenIsFromUser,checkUserId, checkUserUrl, getUserData);
usersRouter.get("/ranking", getRanking);


export default usersRouter;
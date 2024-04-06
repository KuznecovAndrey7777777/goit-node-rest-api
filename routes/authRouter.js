import express from 'express';
import authControllers from '../controllers/authController.js';
import { userSingupSinginSchema } from '../schemas/usersSchemas.js';
import validateBody from '../decorators/validateBody.js';
import authenticate from '../middlewares/authenticate.js';

const authRouter = express.Router();

const validateSignupSignin = validateBody(userSingupSinginSchema);
const ensureAuthenticated = authenticate;

authRouter.post('/register', validateSignupSignin, authControllers.signup);
authRouter.post('/login', validateSignupSignin, authControllers.signin);
authRouter.get('/current', ensureAuthenticated, authControllers.getCurrent);
authRouter.post('/logout', ensureAuthenticated, authControllers.logout);

export default authRouter;
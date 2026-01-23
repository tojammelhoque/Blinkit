import {Router} from 'express';
import { loginUser, logoutUser, registerUser, verifyEmail } from '../controllers/user.controller.js';

const authRouter = Router();

authRouter.post('/register', registerUser)
authRouter.post('/verify-email', verifyEmail);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);

export default authRouter;
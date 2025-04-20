import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';

const userRouter = express.Router();

// Route for user login
userRouter.post('/login', loginUser);
// Route for user registration
userRouter.post('/register', registerUser);

export default userRouter; 
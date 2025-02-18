import express from 'express';
import { registerUser, loginUser } from '../controller/userController.js'; // Import functions from the controller

const router = express.Router();

// Route to register a user
router.post('/register', registerUser);

// Route to login a user
router.post('/login', loginUser);

export default router;

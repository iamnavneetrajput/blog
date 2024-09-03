import { Router } from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// Get user profile (protected route)
router.get('/profile', authMiddleware, getUserProfile);

// Update user profile (protected route)
router.put('/profile', authMiddleware, updateUserProfile);

export default router;

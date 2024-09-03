import { Router } from 'express';

import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router();

// Protected Route
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ msg: 'This is a protected route' });
});

export default router;

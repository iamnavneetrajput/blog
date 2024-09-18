import express from 'express';
import { getCategories, addCategory } from '../controllers/categoryController.js';

const router = express.Router();

// Route to get all categories
router.get('/categories', getCategories);

// Route to add a new category
router.post('/categories', addCategory);

export default router;

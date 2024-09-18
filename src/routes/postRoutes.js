// src/routes/postRoutes.js
import express from 'express';
import { createPost, getPosts, getRecentArticles } from '../controllers/postController.js'; // Adjust import as needed

const router = express.Router();

// Route to create a new post
router.post('/post', createPost);

// Route to get all posts
router.get('/posts', getPosts);

// Route to get recent articles
router.get('/recent-articles', getRecentArticles);

export default router;

// src/routes/postRoutes.js
import express from 'express';
import {
  createPost,
  getPosts,
  getRecentArticles,
  getPostById
} from '../controllers/postController.js';

const router = express.Router();

// Route to create a post
router.post('/posts', createPost);

// Route to get all posts
router.get('/posts', getPosts);

// Route to get the latest three posts
router.get('/recent-articles', getRecentArticles);

// Route to get a post by ID
router.get('/posts/:id', getPostById);

export default router;

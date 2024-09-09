import express from 'express';
import {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
} from '../controllers/postController.js';

const router = express.Router();

router.post('/post', createPost);
router.get('/posts', getPosts);
router.get('/post/:id', getPostById);
router.put('/post/:id', updatePost);
router.delete('/post/:id', deletePost);

export default router;

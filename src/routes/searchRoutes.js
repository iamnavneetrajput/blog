import express from 'express';
import { searchPosts, getTopSearchedPosts, recordSearchTerm } from '../controllers/searchController.js';

const router = express.Router();

router.get('/search', searchPosts);
router.get('/top-searched', getTopSearchedPosts);
router.post('/record-search', recordSearchTerm);

export default router;

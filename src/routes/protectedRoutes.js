import express from 'express';

const router = express.Router();

// Example protected route
router.get('/', (req, res) => {
    res.json({ message: 'This is a protected route!' });
});

export default router;

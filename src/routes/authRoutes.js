const express = require('express');
const { signup, login, verifyEmail } = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');
const verifyEmailMiddleware = require('../middlewares/verifyEmailMiddleware');

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Verify Email route
router.get('/verify-email', verifyEmail);

// Protected route example
router.get('/protected', auth, verifyEmailMiddleware, (req, res) => {
    res.send('This is a protected route, and your email is verified.');
});

export default  router;

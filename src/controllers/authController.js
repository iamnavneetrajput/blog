const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Signup
const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const emailToken = jwt.sign({ email }, process.env.EMAIL_TOKEN_SECRET, {
            expiresIn: process.env.EMAIL_TOKEN_EXPIRES_IN,
        });

        user = new User({
            name,
            email,
            password: hashedPassword,
            emailToken,
        });

        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Verify your email',
            text: `Please verify your email by clicking the following link: 
            ${req.protocol}://${req.get('host')}/api/auth/verify-email?token=${emailToken}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                return res.status(500).json({ msg: 'Error sending verification email' });
            } else {
                console.log('Email sent:', info.response);
                res.json({ msg: 'Signup successful, please verify your email' });
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Email Verification
const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;

        const decoded = jwt.verify(token, process.env.EMAIL_TOKEN_SECRET);
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid token' });
        }

        user.isVerified = true;
        user.emailToken = null;
        await user.save();

        res.json({ msg: 'Email verified successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    signup,
    login,
    verifyEmail,
};

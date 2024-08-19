const User = require('../models/User');

module.exports = async function (req, res, next) {
    try {
        const user = await User.findById(req.user.id);
        if (!user.isVerified) {
            return res.status(401).json({ msg: 'Email not verified' });
        }
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

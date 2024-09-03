import { User } from '../models/User.js';

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Get user profile error:', err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error('Update user profile error:', err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

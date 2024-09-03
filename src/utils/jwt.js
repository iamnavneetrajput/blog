import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  const payload = { user: { id: user.id } };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
};

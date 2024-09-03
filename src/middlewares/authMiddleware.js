import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token'); // Adjust header name if needed

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach user data to request
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default authMiddleware;

// middleware/auth.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

/**
 * Authentication middleware to verify JWT.
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
}

/**
 * Authorization middleware for Admin role.
 */
function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admin only' });
  }
  next();
}

/**
 * Authorization middleware for Officer role.
 */
function officerOnly(req, res, next) {
  if (!req.user || req.user.role !== 'officer') {
    return res.status(403).json({ message: 'Access denied: Officer only' });
  }
  next();
}

module.exports = {
  authMiddleware,
  adminOnly,
  officerOnly,
};

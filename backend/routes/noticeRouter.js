// routes/noticeRouter.js
const express = require('express');
const jwt = require('jsonwebtoken');
const {
  createNotice,
  getTodayNotice,
  listNotices,
} = require('../controllers/noticeController');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
}

function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
}

function officerOnly(req, res, next) {
  if (!req.user || req.user.role !== 'officer') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
}

// Admin: create/update notice for a date
router.post('/', authMiddleware, adminOnly, createNotice);

// Admin: list all notices (optional)
router.get('/', authMiddleware, adminOnly, listNotices);

// Officer: get today's notice
router.get('/today', authMiddleware, officerOnly, getTodayNotice);

module.exports = router;
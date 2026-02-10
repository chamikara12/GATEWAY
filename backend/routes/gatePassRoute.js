// routes/gatePassRoute.js
const express = require('express');
const jwt = require('jsonwebtoken');
const {
  createGatePass,
  recordEntry,
  getLastOpenEntry,
  recordExit,
  getTodayEntered,
  getByDate,
  listActiveGatePasses,
  deleteGatePass,
  countGatePasses,
} = require('../controllers/gatepassController');

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

function adminOrOfficer(req, res, next) {
  if (!req.user) return res.status(403).json({ message: 'Access denied' });
  if (req.user.role !== 'admin' && req.user.role !== 'officer') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
}

// Admin: issue gate pass
router.post('/', authMiddleware, adminOnly, createGatePass);

// Admin: list all active passes
router.get('/active', authMiddleware, adminOnly, listActiveGatePasses);

// Admin: delete gate pass
router.delete('/:id', authMiddleware, adminOnly, deleteGatePass);

// Admin: count all gate passes
router.get('/count/all', authMiddleware, adminOnly, countGatePasses);

// Admin: get passes with entries/exits on selected date
router.get('/by-date', authMiddleware, adminOnly, getByDate);

// Officer: record entry with gate pass
router.post('/entries', authMiddleware, officerOnly, recordEntry);

// Officer/Admin: get last open entry for a vehicle (with gate pass)
router.get(
  '/last-open/:vehicleNumber',
  authMiddleware,
  adminOrOfficer,
  getLastOpenEntry
);

// Officer: record exit with gate pass
router.post('/exit', authMiddleware, officerOnly, recordExit);

// Officer/Admin: get vehicles that entered today (with gate pass)
router.get('/today-entered', authMiddleware, adminOrOfficer, getTodayEntered);

module.exports = router;
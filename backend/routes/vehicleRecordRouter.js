// routes/vehicleRecordRoute.js
const express = require('express');
const jwt = require('jsonwebtoken');
const {
  createVehicleRecordEntry,
  getLastOpenNoPass,
  recordVehicleExit,
  getVehicleRecords,
  getTodayNoPassEntered,
} = require('../controllers/vehicleRecordController');

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

// Officer: entry without gate pass
router.post('/', authMiddleware, officerOnly, createVehicleRecordEntry);

// Admin/Officer: latest open record for vehicle without gate pass
router.get(
  '/last-open/:vehicleNumber',
  authMiddleware,
  adminOrOfficer,
  getLastOpenNoPass
);

// Officer: exit without gate pass
router.post('/exit', authMiddleware, officerOnly, recordVehicleExit);

// Admin/Officer: all records (optional ?date=YYYY-MM-DD)
router.get('/', authMiddleware, adminOrOfficer, getVehicleRecords);

// Admin/Officer: today entries without gate pass
router.get('/today', authMiddleware, adminOrOfficer, getTodayNoPassEntered);

module.exports = router;
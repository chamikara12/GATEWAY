// routes/gatePassRoute.js
const express = require('express');
const {
  createGatePass,
  recordEntry,
  getTodayEntries,
  getByDate,
  listActiveGatePasses,
} = require('../controllers/gatepassController');
const { authMiddleware, adminOnly, officerOnly } = require('../middleware/auth');

const router = express.Router();

// Admin: issue gate pass (period)
router.post('/', authMiddleware, adminOnly, createGatePass);

// Admin: check passes by validUntil date
router.get('/by-date', authMiddleware, adminOnly, getByDate);

// Admin: list all active passes
router.get('/active', authMiddleware, adminOnly, listActiveGatePasses);

// Officer: record entry for a vehicle number
router.post('/entries', authMiddleware, officerOnly, recordEntry);

// Officer: get today’s entries
router.get('/today', authMiddleware, officerOnly, getTodayEntries);

module.exports = router;
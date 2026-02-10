// routes/userRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const {
  createUser,
  listUsers,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// ---------------- AUTH MIDDLEWARE ----------------
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

function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  next();
}

// ---------------- LOGIN ROUTE ----------------
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const envAdmin = {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'admin123',
    role: 'admin',
  };

  try {
    // ✅ ENV ADMIN LOGIN
    if (username === envAdmin.username && password === envAdmin.password) {
      const token = jwt.sign(
        { username: envAdmin.username, role: envAdmin.role },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.json({
        success: true,
        role: 'admin',
        token,
      });
    }

    // ✅ DATABASE USER LOGIN
    const user = await User.findOne({ username }).select('+password');

    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      success: true,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error('login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ---------------- OFFICER DASHBOARD ----------------
router.get('/officer/dashboard', authMiddleware, (req, res) => {
  if (req.user.role !== 'officer') {
    return res.status(403).json({ message: 'Access denied' });
  }

  res.json({
    message: 'Officer dashboard',
    user: req.user.username,
  });
});

// ---------------- ADMIN ROUTES ----------------
router.use(authMiddleware, adminOnly);

router.post('/', createUser);
router.get('/', listUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

router.get('/dashboard', async (req, res) => {
  try {
    const officerCount = await User.countDocuments({ role: 'officer' });
    const adminCount = await User.countDocuments({ role: 'admin' });
    const users = await User.find().select('-password');

    res.json({
      totalOfficers: officerCount,
      totalAdmins: adminCount,
      users,
    });
  } catch (error) {
    console.error('dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
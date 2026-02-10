// controllers/userController.js
const User = require('../models/User');

// ---------------- CREATE USER ----------------
async function createUser(req, res) {
  try {
    const { fullName, username, email, telephone, password, role } = req.body;

    if (!fullName || !username || !email || !telephone || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!['admin', 'officer'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'Username or email already exists',
      });
    }

    const user = await User.create({
      fullName,
      username,
      email,
      telephone,
      password,
      role,
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    console.error('createUser error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

// ---------------- LIST USERS ----------------
async function listUsers(req, res) {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, users });
  } catch (error) {
    console.error('listUsers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

// ---------------- UPDATE USER ----------------
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { fullName, username, email, telephone, role } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.fullName = fullName || user.fullName;
    user.username = username || user.username;
    user.email = email || user.email;
    user.telephone = telephone || user.telephone;
    user.role = role || user.role;

    await user.save();

    res.json({
      success: true,
      message: 'User updated successfully',
      user,
    });
  } catch (error) {
    console.error('updateUser error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

// ---------------- DELETE USER ----------------
async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.deleteOne({ _id: id });

    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('deleteUser error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  createUser,
  listUsers,
  updateUser,
  deleteUser,
};
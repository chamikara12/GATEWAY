// controllers/noticeController.js
const Notice = require('../models/Notice');

// Admin: create or update notice for a specific day
async function createNotice(req, res) {
  try {
    const { title, message, date } = req.body;
    if (!title || !message || !date) {
      return res.status(400).json({ message: 'Title, message and date are required' });
    }

    const noticeDate = new Date(date);
    noticeDate.setHours(0, 0, 0, 0);

    const notice = await Notice.findOneAndUpdate(
      { date: noticeDate },
      {
        title,
        message,
        createdBy: req.user.username,
        date: noticeDate,
      },
      { new: true, upsert: true }
    );

    res.status(201).json({ success: true, notice });
  } catch (err) {
    console.error('createNotice error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Officer: get today notice (visible until 23:59)
async function getTodayNotice(req, res) {
  try {
    const today = new Date();
    const start = new Date(today);
    start.setHours(0, 0, 0, 0);
    const end = new Date(today);
    end.setHours(23, 59, 59, 999);

    const notice = await Notice.findOne({
      date: { $gte: start, $lte: end },
    }).sort({ createdAt: -1 });

    res.json({ success: true, notice });
  } catch (err) {
    console.error('getTodayNotice error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Admin: list all notices (optional)
async function listNotices(req, res) {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.json({ success: true, notices });
  } catch (err) {
    console.error('listNotices error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  createNotice,
  getTodayNotice,
  listNotices,
};
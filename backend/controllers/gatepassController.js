// controllers/gatepassController.js
const GatePass = require('../models/GatePass');

// Admin: issue new gate pass (issueDate = now, validUntil from form)
async function createGatePass(req, res) {
  try {
    const {
      vehicleNumber,
      ownerType,     // 'university' | 'staff' | 'other'
      ownerName,
      purpose,
      validUntil,    // YYYY-MM-DD
      type,          // optional gate pass type; if not provided, use ownerType
    } = req.body;

    if (!vehicleNumber || !ownerType || !ownerName || !purpose || !validUntil) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const issueDate = new Date();
    const validUntilDate = new Date(validUntil);
    const expireAt = new Date(validUntilDate);
    expireAt.setHours(23, 59, 59, 999);

    const pass = await GatePass.create({
      vehicleNumber,
      ownerType,
      type: type || ownerType,
      ownerName,
      purpose,
      issueDate,
      validUntil: validUntilDate,
      expireAt,
      issuedBy: req.user.username,
    });

    res.status(201).json({ success: true, gatePass: pass });
  } catch (err) {
    console.error('createGatePass error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Officer: record vehicle entry for today (only if pass valid today)
async function recordEntry(req, res) {
  try {
    const { vehicleNumber, entryRemark } = req.body;
    if (!vehicleNumber) {
      return res.status(400).json({ message: 'Vehicle number required' });
    }

    const now = new Date();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(now);
    todayEnd.setHours(23, 59, 59, 999);

    const pass = await GatePass.findOne({
      vehicleNumber,
      issueDate: { $lte: todayEnd },
      validUntil: { $gte: todayStart },
    });

    if (!pass) {
      return res.status(404).json({ message: 'No valid gate pass for today' });
    }

    pass.entries.push({
      entryTime: now,
      entryBy: req.user.username,
      entryRemark: entryRemark || '',
    });

    await pass.save();

    res.json({ success: true, gatePass: pass });
  } catch (err) {
    console.error('recordEntry error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Officer: get last open entry for a vehicle (with gate pass)
async function getLastOpenEntry(req, res) {
  try {
    const { vehicleNumber } = req.params;
    if (!vehicleNumber) {
      return res.status(400).json({ message: 'Vehicle number required' });
    }

    const pass = await GatePass.findOne({ vehicleNumber });
    if (!pass) {
      return res.status(404).json({ message: 'No gate pass found for this vehicle' });
    }

    const lastEntryIndex = [...pass.entries]
      .reverse()
      .findIndex((e) => !e.exitTime);

    if (lastEntryIndex === -1) {
      return res
        .status(404)
        .json({ message: 'No active entry found for this vehicle' });
    }

    const lastEntry =
      pass.entries[pass.entries.length - 1 - lastEntryIndex];

    return res.json({
      success: true,
      vehicleNumber: pass.vehicleNumber,
      ownerName: pass.ownerName,
      ownerType: pass.ownerType,
      type: pass.type,
      entry: {
        entryTime: lastEntry.entryTime,
        entryRemark: lastEntry.entryRemark,
        entryBy: lastEntry.entryBy,
      },
    });
  } catch (err) {
    console.error('getLastOpenEntry error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Officer: record exit for a vehicle with gate pass
async function recordExit(req, res) {
  try {
    const { vehicleNumber, exitNote } = req.body;
    if (!vehicleNumber) {
      return res.status(400).json({ message: 'Vehicle number required' });
    }

    const pass = await GatePass.findOne({ vehicleNumber });

    if (!pass) {
      return res.status(404).json({ message: 'No gate pass found for this vehicle' });
    }

    const lastEntry = [...pass.entries].reverse().find((e) => !e.exitTime);
    if (!lastEntry) {
      return res
        .status(400)
        .json({ message: 'No active entry found to mark exit for this vehicle' });
    }

    lastEntry.exitTime = new Date();
    lastEntry.exitNote = exitNote || '';
    lastEntry.exitBy = req.user.username;

    await pass.save();

    res.json({ success: true, gatePass: pass });
  } catch (err) {
    console.error('recordExit error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Officer/Admin: get vehicles that ENTERED today (with gate pass)
async function getTodayEntered(req, res) {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const passes = await GatePass.find({
      'entries.entryTime': { $gte: todayStart, $lte: todayEnd },
    }).select('-__v');

    res.json({ success: true, passes });
  } catch (err) {
    console.error('getTodayEntered error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Admin: get passes with entries or exits on a specific date
async function getByDate(req, res) {
  try {
    const { date } = req.query;
    if (!date) {
      return res
        .status(400)
        .json({ message: 'Date query is required (YYYY-MM-DD)' });
    }

    const selected = new Date(date);
    const start = new Date(selected);
    start.setHours(0, 0, 0, 0);
    const end = new Date(selected);
    end.setHours(23, 59, 59, 999);

    const passes = await GatePass.find({
      $or: [
        { 'entries.entryTime': { $gte: start, $lte: end } },
        { 'entries.exitTime': { $gte: start, $lte: end } },
      ],
    }).select('-__v');

    res.json({ success: true, passes });
  } catch (err) {
    console.error('getByDate error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Admin: list all active (not expired) gate passes
async function listActiveGatePasses(req, res) {
  try {
    const now = new Date();
    const passes = await GatePass.find({
      expireAt: { $gt: now },
    }).select('-__v');
    res.json({ success: true, passes });
  } catch (err) {
    console.error('listActiveGatePasses error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Admin: delete gate pass
async function deleteGatePass(req, res) {
  try {
    const { id } = req.params;
    const pass = await GatePass.findById(id);
    if (!pass) return res.status(404).json({ message: 'Gate pass not found' });

    await GatePass.deleteOne({ _id: id });
    res.json({ success: true, message: 'Gate pass deleted successfully' });
  } catch (err) {
    console.error('deleteGatePass error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Admin: count all gate passes (for dashboard)
async function countGatePasses(req, res) {
  try {
    const total = await GatePass.countDocuments();
    res.json({ success: true, total });
  } catch (err) {
    console.error('countGatePasses error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  createGatePass,
  recordEntry,
  getLastOpenEntry,
  recordExit,
  getTodayEntered,
  getByDate,
  listActiveGatePasses,
  deleteGatePass,
  countGatePasses,
};
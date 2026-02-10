// controllers/vehicleRecordController.js
const VehicleRecord = require('../models/vehicleRecords');

// Officer: log vehicle entry that entered without gate pass
async function createVehicleRecordEntry(req, res) {
  try {
    const { vehicleNumber, driverName, contactNo, additionalNote, reason } = req.body;

    if (!vehicleNumber || !driverName || !contactNo || !reason) {
      return res.status(400).json({
        message: 'Vehicle number, driver name, contact number and reason are required',
      });
    }

    const record = await VehicleRecord.create({
      vehicleNumber,
      driverName,
      contactNo,
      additionalNote: additionalNote || '',
      reason,
      entryBy: req.user.username,
    });

    res.status(201).json({ success: true, record });
  } catch (err) {
    console.error('createVehicleRecordEntry error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Officer: get latest open record for vehicle without gate pass
async function getLastOpenNoPass(req, res) {
  try {
    const { vehicleNumber } = req.params;
    if (!vehicleNumber) {
      return res.status(400).json({ message: 'Vehicle number required' });
    }

    const record = await VehicleRecord.findOne({
      vehicleNumber,
      exitTime: { $exists: false },
    }).sort({ entryTime: -1 });

    if (!record) {
      return res
        .status(404)
        .json({ message: 'No active record found for this vehicle' });
    }

    res.json({
      success: true,
      record: {
        vehicleNumber: record.vehicleNumber,
        driverName: record.driverName,
        contactNo: record.contactNo,
        additionalNote: record.additionalNote,
        reason: record.reason,
        entryTime: record.entryTime,
        entryBy: record.entryBy,
      },
    });
  } catch (err) {
    console.error('getLastOpenNoPass error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Officer: mark exit for vehicle without gate pass
async function recordVehicleExit(req, res) {
  try {
    const { vehicleNumber, exitNote } = req.body;
    if (!vehicleNumber) {
      return res.status(400).json({ message: 'Vehicle number required' });
    }

    const record = await VehicleRecord.findOne({
      vehicleNumber,
      exitTime: { $exists: false },
    }).sort({ entryTime: -1 });

    if (!record) {
      return res
        .status(400)
        .json({ message: 'No active entry found to mark exit for this vehicle' });
    }

    record.exitTime = new Date();
    record.exitNote = exitNote || '';
    record.exitBy = req.user.username;

    await record.save();

    res.json({ success: true, record });
  } catch (err) {
    console.error('recordVehicleExit error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Admin/Officer: get records (optionally date)
async function getVehicleRecords(req, res) {
  try {
    const { date } = req.query;
    const filter = {};

    if (date) {
      const selected = new Date(date);
      const start = new Date(selected);
      start.setHours(0, 0, 0, 0);
      const end = new Date(selected);
      end.setHours(23, 59, 59, 999);

      filter.entryTime = { $gte: start, $lte: end };
    }

    const records = await VehicleRecord.find(filter)
      .sort({ entryTime: -1 })
      .select('-__v');

    res.json({ success: true, records });
  } catch (err) {
    console.error('getVehicleRecords error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Admin/Officer: get today entries without pass
async function getTodayNoPassEntered(req, res) {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const records = await VehicleRecord.find({
      entryTime: { $gte: todayStart, $lte: todayEnd },
    })
      .sort({ entryTime: -1 })
      .select('-__v');

    res.json({ success: true, records });
  } catch (err) {
    console.error('getTodayNoPassEntered error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  createVehicleRecordEntry,
  getLastOpenNoPass,
  recordVehicleExit,
  getVehicleRecords,
  getTodayNoPassEntered,
};
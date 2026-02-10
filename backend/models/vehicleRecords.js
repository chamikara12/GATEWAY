// models/vehicleRecords.js
const mongoose = require('mongoose');

const vehicleRecordSchema = new mongoose.Schema(
  {
    vehicleNumber: { type: String, required: true },

    driverName: { type: String, required: true },
    contactNo: { type: String, required: true },
    additionalNote: { type: String, default: '' },

    entryTime: { type: Date, default: Date.now },
    entryBy: { type: String, required: true }, // officer username

    exitTime: { type: Date },                  // set when exiting
    exitNote: { type: String, default: '' },
    exitBy: { type: String },                  // officer username who logged exit

    reason: { type: String, required: true },  // why no gatepass
  },
  { timestamps: true }
);

module.exports = mongoose.model('VehicleRecord', vehicleRecordSchema);
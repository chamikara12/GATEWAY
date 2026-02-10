// models/GatePass.js
const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema(
  {
    entryTime: { type: Date, default: Date.now },
    entryBy: { type: String, required: true },        // officer username
    entryRemark: { type: String, default: '' },

    exitTime: { type: Date },                         // set when vehicle exits
    exitNote: { type: String, default: '' },
    exitBy: { type: String },                         // officer username who logged exit
  },
  { _id: false }
);

const gatePassSchema = new mongoose.Schema(
  {
    vehicleNumber: { type: String, required: true },               // e.g. NC-1234
    type: {                                                        // gate pass type
      type: String,
      enum: ['university', 'staff', 'other'],
      default: 'university',
    },
    ownerType: { type: String, enum: ['university', 'staff', 'other'], required: true },
    ownerName: { type: String, required: true },                   // staff / unit / other
    purpose: { type: String, required: true },

    issueDate: { type: Date, default: Date.now, required: true },  // from date
    validUntil: { type: Date, required: true },                    // to date
    expireAt: { type: Date, required: true },                      // used by TTL

    issuedBy: { type: String, required: true },                    // admin username

    entries: [entrySchema],
  },
  { timestamps: true }
);

// TTL index: delete document when expireAt time is reached
gatePassSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('GatePass', gatePassSchema);
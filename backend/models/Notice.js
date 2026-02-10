// models/Notice.js
const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    // date this notice applies to (only date part is used)
    date: { type: Date, required: true },
    createdBy: { type: String, required: true }, // admin username
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notice', noticeSchema);
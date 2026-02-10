// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const gatePassRoutes = require('./routes/gatePassRoute');
const vehicleRecordRouter = require('./routes/vehicleRecordRouter');
const noticeRouter = require('./routes/noticeRouter');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error', err));

// Mount all user/auth/admin routes under /api/users
app.use('/api/users', userRoutes);
app.use('/api/gatepasses', gatePassRoutes);
app.use('/api/vehicle-records', vehicleRecordRouter);
app.use('/api/notices', noticeRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth.route');
const jobRoutes = require('./routes/job.route');
const candidatureRoutes = require('./routes/candidature.route');
const userController = require('./controllers/auth.controller');
const authMiddleware = require('./middlewares/auth.middleware');
const adminRoutes = require('./routes/admin.route');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));

app.use(express.json());

let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO);
  isConnected = true;
  console.log('Connected to MongoDB');
};

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: 'Database connection failed' });
  }
});

app.use('/auth', authRoutes);
app.use('/users/me', authMiddleware.authenticateToken, (req, res) => userController.getMe(req, res));
app.use('/jobs', jobRoutes);
app.use('/candidatures', candidatureRoutes);
app.use('/admin', adminRoutes);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
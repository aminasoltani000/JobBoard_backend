
const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth.route');
const jobRoutes = require('./routes/job.route');
const candidatureRoutes = require('./routes/candidature.route');
const userController = require('./controllers/auth.controller');
const authMiddleware = require('./middlewares/auth.middleware');
const adminRoutes = require('./routes/admin.route');
const app = express();

// Middleware
app.use(express.json());

// Database connection
const MONGO = process.env.MONGO;
mongoose.connect(MONGO)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/auth', authRoutes);
app.use('/users/me', authMiddleware.authenticateToken, (req, res) => userController.getMe(req, res));
app.use('/jobs', jobRoutes);
app.use('/candidatures', candidatureRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
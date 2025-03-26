const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./authRoutes');
const activityRoutes = require('./activityRoutes');
const challengeRoutes = require('./challengeRoutes');
const rewardRoutes = require('./rewardRoutes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/activities', activityRoutes);
router.use('/challenges', challengeRoutes);
router.use('/rewards', rewardRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router; 
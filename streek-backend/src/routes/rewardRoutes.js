const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/auth');
const {
  getAllRewards,
  getReward,
  getUserRewards,
  redeemReward,
  getRewardHistory,
} = require('../controllers/rewardController');

// All routes require authentication
router.use(authenticateJWT);

// Get all available rewards
router.get('/', getAllRewards);

// Get a specific reward by ID
router.get('/:id', getReward);

// Get user's rewards
router.get('/user/rewards', getUserRewards);

// Get user's reward history
router.get('/user/history', getRewardHistory);

// Redeem a reward
router.post('/:id/redeem', redeemReward);

module.exports = router; 
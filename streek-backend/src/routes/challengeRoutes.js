const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/auth');
const {
  getAllChallenges,
  getChallenge,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  joinChallenge,
  leaveChallenge,
  getChallengeProgress,
} = require('../controllers/challengeController');

// All routes require authentication
router.use(authenticateJWT);

// Get all challenges with optional filters
router.get('/', getAllChallenges);

// Get a specific challenge by ID
router.get('/:id', getChallenge);

// Create a new challenge
router.post('/', createChallenge);

// Update a challenge
router.put('/:id', updateChallenge);

// Delete a challenge
router.delete('/:id', deleteChallenge);

// Join a challenge
router.post('/:id/join', joinChallenge);

// Leave a challenge
router.post('/:id/leave', leaveChallenge);

// Get challenge progress
router.get('/:id/progress', getChallengeProgress);

module.exports = router; 
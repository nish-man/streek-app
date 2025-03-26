const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/auth');
const {
  getAllActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
  getActivityStats,
} = require('../controllers/activityController');

// All routes require authentication
router.use(authenticateJWT);

// Get all activities with optional filters
router.get('/', getAllActivities);

// Get activity statistics
router.get('/stats', getActivityStats);

// Get a specific activity by ID
router.get('/:id', getActivity);

// Create a new activity
router.post('/', createActivity);

// Update an activity
router.put('/:id', updateActivity);

// Delete an activity
router.delete('/:id', deleteActivity);

module.exports = router; 
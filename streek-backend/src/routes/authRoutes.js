const express = require('express');
const router = express.Router();
const passport = require('passport');
const { authenticateJWT } = require('../middleware/auth');
const { register, login, getProfile, googleCallback } = require('../controllers/authController');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Google OAuth routes
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  googleCallback
);

// Protected routes
router.get('/profile', authenticateJWT, getProfile);

module.exports = router; 
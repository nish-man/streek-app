const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config/config');
const logger = require('../utils/logger');
const { createErrorResponse } = require('../utils/errorHandler');

/**
 * Generate JWT token for a user
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
};

/**
 * User registration
 */
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json(createErrorResponse(400, 'Email already registered'));
    }

    // Create new user
    const user = await User.create({
      email,
      password,
      name,
      role: 'user',
      status: 'active',
    });

    // Generate token
    const token = generateToken(user);

    // Update last login
    await user.update({ lastLogin: new Date() });

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    logger.error('Registration Error:', error);
    res.status(500).json(createErrorResponse(500, 'Failed to register user'));
  }
};

/**
 * User login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json(createErrorResponse(401, 'Invalid credentials'));
    }

    // Check if account is active
    if (user.status !== 'active') {
      return res.status(403).json(createErrorResponse(403, 'Account is not active'));
    }

    // Validate password
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json(createErrorResponse(401, 'Invalid credentials'));
    }

    // Generate token
    const token = generateToken(user);

    // Update last login
    await user.update({ lastLogin: new Date() });

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    logger.error('Login Error:', error);
    res.status(500).json(createErrorResponse(500, 'Failed to login'));
  }
};

/**
 * Get current user profile
 */
const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(404).json(createErrorResponse(404, 'User not found'));
    }

    res.json({ success: true, data: user });
  } catch (error) {
    logger.error('Get Profile Error:', error);
    res.status(500).json(createErrorResponse(500, 'Failed to get user profile'));
  }
};

const googleCallback = async (req, res) => {
  try {
    // Generate token for the authenticated user
    const token = generateToken(req.user);

    // Update last login
    await req.user.update({ lastLogin: new Date() });

    // Redirect to frontend with token
    res.redirect(`${config.frontend.url}/auth/callback?token=${token}`);
  } catch (error) {
    logger.error('Google Callback Error:', error);
    res.redirect(`${config.frontend.url}/auth/error`);
  }
};

module.exports = {
  register,
  login,
  getProfile,
  googleCallback,
}; 
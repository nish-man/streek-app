const { Reward, UserReward, User, Activity } = require('../models');
const { createErrorResponse } = require('../utils/errorHandler');
const { Op } = require('sequelize');

// Get all available rewards
const getAllRewards = async (req, res) => {
  try {
    const { type, limit = 10, offset = 0 } = req.query;
    const where = {};

    if (type) {
      where.type = type;
    }

    const rewards = await Reward.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['pointsRequired', 'ASC']],
    });

    res.json({
      success: true,
      data: rewards.rows,
      pagination: {
        total: rewards.count,
        limit: parseInt(limit),
        offset: parseInt(offset),
      },
    });
  } catch (error) {
    res.status(500).json(createErrorResponse(500, 'Failed to fetch rewards'));
  }
};

// Get reward by ID
const getReward = async (req, res) => {
  try {
    const reward = await Reward.findByPk(req.params.id);
    if (!reward) {
      return res.status(404).json(createErrorResponse(404, 'Reward not found'));
    }
    res.json({ success: true, data: reward });
  } catch (error) {
    res.status(500).json(createErrorResponse(500, 'Failed to fetch reward'));
  }
};

// Get user's rewards
const getUserRewards = async (req, res) => {
  try {
    const userRewards = await UserReward.findAll({
      where: {
        userId: req.user.id,
        status: 'active',
      },
      include: [
        {
          model: Reward,
          attributes: ['name', 'description', 'type', 'pointsRequired'],
        },
      ],
    });

    res.json({ success: true, data: userRewards });
  } catch (error) {
    res.status(500).json(createErrorResponse(500, 'Failed to fetch user rewards'));
  }
};

// Get user's reward history
const getRewardHistory = async (req, res) => {
  try {
    const userRewards = await UserReward.findAll({
      where: {
        userId: req.user.id,
      },
      include: [
        {
          model: Reward,
          attributes: ['name', 'description', 'type', 'pointsRequired'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({ success: true, data: userRewards });
  } catch (error) {
    res.status(500).json(createErrorResponse(500, 'Failed to fetch reward history'));
  }
};

// Redeem a reward
const redeemReward = async (req, res) => {
  try {
    const reward = await Reward.findByPk(req.params.id);
    if (!reward) {
      return res.status(404).json(createErrorResponse(404, 'Reward not found'));
    }

    // Get user's total points
    const userActivities = await Activity.findAll({
      where: {
        userId: req.user.id,
      },
    });

    const totalPoints = userActivities.reduce((sum, activity) => sum + activity.points, 0);

    // Check if user has enough points
    if (totalPoints < reward.pointsRequired) {
      return res.status(400).json(
        createErrorResponse(400, 'Insufficient points to redeem this reward')
      );
    }

    // Create user reward record
    const userReward = await UserReward.create({
      userId: req.user.id,
      rewardId: reward.id,
      status: 'active',
      redeemedAt: new Date(),
    });

    res.json({
      success: true,
      message: 'Reward redeemed successfully',
      data: userReward,
    });
  } catch (error) {
    res.status(500).json(createErrorResponse(500, 'Failed to redeem reward'));
  }
};

module.exports = {
  getAllRewards,
  getReward,
  getUserRewards,
  redeemReward,
  getRewardHistory,
}; 
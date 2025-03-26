const { Challenge, User, Activity } = require('../models');
const { createErrorResponse } = require('../utils/errorHandler');
const { Op } = require('sequelize');

// Get all challenges
const getAllChallenges = async (req, res) => {
  try {
    const { type, status, limit = 10, offset = 0 } = req.query;
    const where = {};

    if (type) {
      where.type = type;
    }

    if (status) {
      where.status = status;
    }

    const challenges = await Challenge.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      data: challenges.rows,
      pagination: {
        total: challenges.count,
        limit: parseInt(limit),
        offset: parseInt(offset),
      },
    });
  } catch (error) {
    res.status(500).json(createErrorResponse(500, 'Failed to fetch challenges'));
  }
};

// Get challenge by ID
const getChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByPk(req.params.id);
    if (!challenge) {
      return res.status(404).json(createErrorResponse(404, 'Challenge not found'));
    }
    res.json({ success: true, data: challenge });
  } catch (error) {
    res.status(500).json(createErrorResponse(500, 'Failed to fetch challenge'));
  }
};

// Create challenge
const createChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json({ success: true, data: challenge });
  } catch (error) {
    res.status(500).json(createErrorResponse(500, 'Failed to create challenge'));
  }
};

// Update challenge
const updateChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByPk(req.params.id);
    if (!challenge) {
      return res.status(404).json(createErrorResponse(404, 'Challenge not found'));
    }

    await challenge.update(req.body);
    res.json({ success: true, data: challenge });
  } catch (error) {
    res.status(500).json(createErrorResponse(500, 'Failed to update challenge'));
  }
};

// Delete challenge
const deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByPk(req.params.id);
    if (!challenge) {
      return res.status(404).json(createErrorResponse(404, 'Challenge not found'));
    }

    await challenge.destroy();
    res.json({ success: true, message: 'Challenge deleted successfully' });
  } catch (error) {
    res.status(500).json(createErrorResponse(500, 'Failed to delete challenge'));
  }
};

// Join challenge
const joinChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByPk(req.params.id);
    if (!challenge) {
      return res.status(404).json(createErrorResponse(404, 'Challenge not found'));
    }

    if (challenge.status !== 'active') {
      return res.status(400).json(createErrorResponse(400, 'Challenge is not active'));
    }

    const user = await User.findByPk(req.user.id);
    await challenge.addParticipant(user);
    res.json({ success: true, message: 'Successfully joined challenge' });
  } catch (error) {
    res.status(500).json(createErrorResponse(500, 'Failed to join challenge'));
  }
};

// Leave challenge
const leaveChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByPk(req.params.id);
    if (!challenge) {
      return res.status(404).json(createErrorResponse(404, 'Challenge not found'));
    }

    const user = await User.findByPk(req.user.id);
    await challenge.removeParticipant(user);
    res.json({ success: true, message: 'Successfully left challenge' });
  } catch (error) {
    res.status(500).json(createErrorResponse(500, 'Failed to leave challenge'));
  }
};

// Get challenge progress
const getChallengeProgress = async (req, res) => {
  try {
    const challenge = await Challenge.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'participants',
          through: { attributes: [] },
        },
      ],
    });

    if (!challenge) {
      return res.status(404).json(createErrorResponse(404, 'Challenge not found'));
    }

    const userActivities = await Activity.findAll({
      where: {
        userId: req.user.id,
        type: challenge.type,
        date: {
          [Op.between]: [challenge.startDate, challenge.endDate],
        },
      },
    });

    const progress = {
      totalActivities: userActivities.length,
      totalPoints: userActivities.reduce((sum, activity) => sum + activity.points, 0),
      target: challenge.target,
      unit: challenge.unit,
      startDate: challenge.startDate,
      endDate: challenge.endDate,
    };

    res.json({ success: true, data: progress });
  } catch (error) {
    res.status(500).json(createErrorResponse(500, 'Failed to fetch challenge progress'));
  }
};

module.exports = {
  getAllChallenges,
  getChallenge,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  joinChallenge,
  leaveChallenge,
  getChallengeProgress,
}; 
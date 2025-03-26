const bcrypt = require('bcryptjs');
const { User, Activity, Challenge, Reward, UserReward } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create demo users
    const users = await User.bulkCreate([
      {
        email: 'demo@streek.com',
        password: await bcrypt.hash('demo123', 10),
        name: 'Demo User',
        role: 'user',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'admin@streek.com',
        password: await bcrypt.hash('admin123', 10),
        name: 'Admin User',
        role: 'admin',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Create demo activities
    const activities = await Activity.bulkCreate([
      {
        userId: users[0].id,
        type: 'running',
        distance: 5.2,
        duration: 1800,
        calories: 450,
        points: 52,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: users[0].id,
        type: 'cycling',
        distance: 20,
        duration: 3600,
        calories: 600,
        points: 100,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: users[0].id,
        type: 'swimming',
        distance: 1.5,
        duration: 1800,
        calories: 300,
        points: 45,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Create demo challenges
    const challenges = await Challenge.bulkCreate([
      {
        name: 'Weekly Running Challenge',
        description: 'Run 20km in a week',
        type: 'running',
        target: 20,
        unit: 'km',
        points: 200,
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: 'active',
        createdBy: users[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Monthly Cycling Challenge',
        description: 'Cycle 100km in a month',
        type: 'cycling',
        target: 100,
        unit: 'km',
        points: 500,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'active',
        createdBy: users[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Create demo rewards
    const rewards = await Reward.bulkCreate([
      {
        name: 'Premium Membership (1 Month)',
        description: 'Access to premium features for 1 month',
        type: 'premium',
        pointsRequired: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Custom Workout Plan',
        description: 'Get a personalized workout plan from our experts',
        type: 'service',
        pointsRequired: 500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Streek T-Shirt',
        description: 'Exclusive Streek branded t-shirt',
        type: 'merchandise',
        pointsRequired: 300,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Create demo user rewards
    await UserReward.bulkCreate([
      {
        userId: users[0].id,
        rewardId: rewards[0].id,
        status: 'active',
        redeemedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Add user to challenges
    await challenges[0].addParticipant(users[0]);
    await challenges[1].addParticipant(users[0]);
  },

  down: async (queryInterface, Sequelize) => {
    await UserReward.destroy({ where: {} });
    await Reward.destroy({ where: {} });
    await Challenge.destroy({ where: {} });
    await Activity.destroy({ where: {} });
    await User.destroy({ where: {} });
  },
}; 
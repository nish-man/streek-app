const User = require('./User');
const Activity = require('./Activity');
const Challenge = require('./Challenge');
const Reward = require('./Reward');
const UserReward = require('./UserReward');
const { sequelize } = require('../config/database');

// Define relationships

// User <-> Activity relationship (One-to-Many)
User.hasMany(Activity, { foreignKey: 'userId', as: 'activities' });
Activity.belongsTo(User, { foreignKey: 'userId' });

// User <-> Challenge relationship (One-to-Many)
User.hasMany(Challenge, { foreignKey: 'userId', as: 'challenges' });
Challenge.belongsTo(User, { foreignKey: 'userId' });

// User <-> UserReward relationship (One-to-Many)
User.hasMany(UserReward, { foreignKey: 'userId', as: 'userRewards' });
UserReward.belongsTo(User, { foreignKey: 'userId' });

// Reward <-> UserReward relationship (One-to-Many)
Reward.hasMany(UserReward, { foreignKey: 'rewardId', as: 'userRewards' });
UserReward.belongsTo(Reward, { foreignKey: 'rewardId' });

// Function to initialize models and synchronize database
const initializeDatabase = async (forceSync = false) => {
  try {
    // Sync all models with the database
    await sequelize.sync({ force: forceSync });
    console.log('Database synchronized successfully');
    return true;
  } catch (error) {
    console.error('Failed to synchronize database:', error);
    return false;
  }
};

module.exports = {
  sequelize,
  User,
  Activity,
  Challenge,
  Reward,
  UserReward,
  initializeDatabase
}; 
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UserReward = sequelize.define('UserReward', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  rewardId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  awardedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  redeemed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  redeemedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  pointsSpent: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['userId', 'rewardId']
    },
    {
      fields: ['redeemed']
    }
  ]
});

module.exports = UserReward; 
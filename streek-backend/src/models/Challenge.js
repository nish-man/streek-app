const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Challenge = sequelize.define('Challenge', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('running', 'gym', 'yoga', 'cycling', 'other'),
    allowNull: false
  },
  frequency: {
    type: DataTypes.ENUM('daily', 'alternate', 'weekly', 'monthly'),
    allowNull: false
  },
  streak: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  lastCompleted: {
    type: DataTypes.DATE,
    allowNull: true
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  proofRequired: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['userId', 'type']
    },
    {
      fields: ['frequency']
    }
  ]
});

module.exports = Challenge; 
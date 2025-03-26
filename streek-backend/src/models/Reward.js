const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Reward = sequelize.define('Reward', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('premium', 'achievement', 'milestone', 'special'),
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pointsRequired: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  validFrom: {
    type: DataTypes.DATE,
    allowNull: true
  },
  validUntil: {
    type: DataTypes.DATE,
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
      fields: ['category', 'pointsRequired']
    }
  ]
});

module.exports = Reward; 
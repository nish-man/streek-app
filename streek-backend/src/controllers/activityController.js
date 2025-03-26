const { Activity, User } = require('../models');
const { createErrorResponse } = require('../middleware/errorHandler');
const { Op } = require('sequelize');

/**
 * Get all activities for the current user
 */
const getAllActivities = async (req, res, next) => {
  try {
    const { type, startDate, endDate, limit = 20, offset = 0 } = req.query;
    
    const query = {
      where: { userId: req.user.id },
      order: [['date', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    };
    
    // Apply filters if provided
    if (type && type !== 'all') {
      query.where.type = type;
    }
    
    if (startDate && endDate) {
      query.where.date = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    } else if (startDate) {
      query.where.date = {
        [Op.gte]: new Date(startDate)
      };
    } else if (endDate) {
      query.where.date = {
        [Op.lte]: new Date(endDate)
      };
    }
    
    const activities = await Activity.findAll(query);
    const total = await Activity.count({ where: query.where });
    
    return res.status(200).json({
      status: 'success',
      data: {
        activities,
        pagination: {
          total,
          limit: parseInt(limit),
          offset: parseInt(offset),
          hasMore: total > parseInt(offset) + parseInt(limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get activity by ID
 */
const getActivity = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const activity = await Activity.findOne({
      where: {
        id,
        userId: req.user.id
      }
    });
    
    if (!activity) {
      return res.status(404).json(createErrorResponse(
        404,
        'Activity not found'
      ));
    }
    
    return res.status(200).json({
      status: 'success',
      data: { activity }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new activity
 */
const createActivity = async (req, res, next) => {
  try {
    const { name, type, date, duration, distance, calories, notes, proofImageUrl } = req.body;
    
    const activity = await Activity.create({
      userId: req.user.id,
      name,
      type,
      date: date || new Date(),
      duration,
      distance,
      calories,
      notes,
      proofImageUrl,
      completed: true, // Default for manually created activities
      points: calculatePoints({ type, duration, distance }) // Calculate points based on activity
    });
    
    return res.status(201).json({
      status: 'success',
      message: 'Activity created successfully',
      data: { activity }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update an activity
 */
const updateActivity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, type, date, duration, distance, calories, notes, proofImageUrl, completed } = req.body;
    
    const activity = await Activity.findOne({
      where: {
        id,
        userId: req.user.id
      }
    });
    
    if (!activity) {
      return res.status(404).json(createErrorResponse(
        404,
        'Activity not found'
      ));
    }
    
    // Update activity
    await activity.update({
      name: name || activity.name,
      type: type || activity.type,
      date: date || activity.date,
      duration: duration !== undefined ? duration : activity.duration,
      distance: distance !== undefined ? distance : activity.distance,
      calories: calories !== undefined ? calories : activity.calories,
      notes: notes || activity.notes,
      proofImageUrl: proofImageUrl || activity.proofImageUrl,
      completed: completed !== undefined ? completed : activity.completed,
      points: type || duration || distance ? calculatePoints({
        type: type || activity.type,
        duration: duration !== undefined ? duration : activity.duration,
        distance: distance !== undefined ? distance : activity.distance
      }) : activity.points
    });
    
    return res.status(200).json({
      status: 'success',
      message: 'Activity updated successfully',
      data: { activity }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete an activity
 */
const deleteActivity = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const activity = await Activity.findOne({
      where: {
        id,
        userId: req.user.id
      }
    });
    
    if (!activity) {
      return res.status(404).json(createErrorResponse(
        404,
        'Activity not found'
      ));
    }
    
    await activity.destroy();
    
    return res.status(200).json({
      status: 'success',
      message: 'Activity deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get activity statistics for the current user
 */
const getActivityStats = async (req, res, next) => {
  try {
    const { period = 'weekly' } = req.query;
    
    // Set date range based on period
    let startDate;
    const endDate = new Date();
    
    switch (period) {
      case 'weekly':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'monthly':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case 'yearly':
        startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
    }
    
    // Get activities within the period
    const activities = await Activity.findAll({
      where: {
        userId: req.user.id,
        date: {
          [Op.between]: [startDate, endDate]
        }
      },
      attributes: ['type', 'duration', 'distance', 'calories', 'date']
    });
    
    // Process activities into stats
    const stats = processActivityStats(activities, period);
    
    return res.status(200).json({
      status: 'success',
      data: { stats }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Helper function to calculate points based on activity details
 */
const calculatePoints = ({ type, duration = 0, distance = 0 }) => {
  // Base points by activity type
  const basePoints = {
    running: 10,
    gym: 8,
    yoga: 6,
    cycling: 7,
    other: 5
  };
  
  // Points for duration (per 30 mins)
  const durationPoints = Math.floor(duration / 30) * 5;
  
  // Points for distance (per km)
  const distancePoints = Math.floor(distance) * 2;
  
  return (basePoints[type] || 5) + durationPoints + distancePoints;
};

/**
 * Helper function to process activities into stats
 */
const processActivityStats = (activities, period) => {
  // Initialize result object
  const stats = {
    totalActivities: activities.length,
    byType: {
      running: 0,
      gym: 0,
      yoga: 0,
      cycling: 0,
      other: 0
    },
    totalDuration: 0,
    totalDistance: 0,
    totalCalories: 0,
    timeline: []
  };
  
  // Count activities by type
  activities.forEach(activity => {
    stats.byType[activity.type] = (stats.byType[activity.type] || 0) + 1;
    stats.totalDuration += activity.duration || 0;
    stats.totalDistance += activity.distance || 0;
    stats.totalCalories += activity.calories || 0;
  });
  
  // Generate timeline data based on period
  if (period === 'weekly') {
    // Group by day of week
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Initialize days
    const dayData = {};
    days.forEach(day => {
      dayData[day] = {
        running: 0,
        gym: 0,
        yoga: 0,
        cycling: 0,
        other: 0,
        total: 0
      };
    });
    
    // Fill data
    activities.forEach(activity => {
      const dayName = days[new Date(activity.date).getDay()];
      dayData[dayName][activity.type] += 1;
      dayData[dayName].total += 1;
    });
    
    // Convert to array format
    stats.timeline = Object.keys(dayData).map(day => ({
      name: day,
      ...dayData[day]
    }));
    
  } else if (period === 'monthly') {
    // Group by week
    const weekData = {
      'Week 1': { running: 0, gym: 0, yoga: 0, cycling: 0, other: 0, total: 0 },
      'Week 2': { running: 0, gym: 0, yoga: 0, cycling: 0, other: 0, total: 0 },
      'Week 3': { running: 0, gym: 0, yoga: 0, cycling: 0, other: 0, total: 0 },
      'Week 4': { running: 0, gym: 0, yoga: 0, cycling: 0, other: 0, total: 0 }
    };
    
    // Fill data
    activities.forEach(activity => {
      const activityDate = new Date(activity.date);
      const today = new Date();
      const diffTime = Math.abs(today - activityDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      let weekKey;
      if (diffDays <= 7) {
        weekKey = 'Week 1';
      } else if (diffDays <= 14) {
        weekKey = 'Week 2';
      } else if (diffDays <= 21) {
        weekKey = 'Week 3';
      } else {
        weekKey = 'Week 4';
      }
      
      weekData[weekKey][activity.type] += 1;
      weekData[weekKey].total += 1;
    });
    
    // Convert to array format
    stats.timeline = Object.keys(weekData).map(week => ({
      name: week,
      ...weekData[week]
    }));
    
  } else if (period === 'yearly') {
    // Group by month
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Initialize months
    const monthData = {};
    months.forEach(month => {
      monthData[month] = {
        running: 0,
        gym: 0,
        yoga: 0,
        cycling: 0,
        other: 0,
        total: 0
      };
    });
    
    // Fill data
    activities.forEach(activity => {
      const monthName = months[new Date(activity.date).getMonth()];
      monthData[monthName][activity.type] += 1;
      monthData[monthName].total += 1;
    });
    
    // Convert to array format
    stats.timeline = Object.keys(monthData).map(month => ({
      name: month,
      ...monthData[month]
    }));
  }
  
  return stats;
};

module.exports = {
  getAllActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
  getActivityStats
}; 
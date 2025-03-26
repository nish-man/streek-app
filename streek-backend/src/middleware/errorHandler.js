const logger = require('../utils/logger');
const config = require('../config/config');

/**
 * Error response helper function
 */
const createErrorResponse = (statusCode, message, errors = null, stack = null) => {
  const response = {
    status: 'error',
    statusCode,
    message
  };

  if (errors) {
    response.errors = errors;
  }
  
  // Include stack trace in development mode
  if (stack && config.server.nodeEnv === 'development') {
    response.stack = stack;
  }
  
  return response;
};

/**
 * 404 Not Found middleware
 */
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  
  // Log the error
  if (statusCode === 500) {
    logger.error(`[${req.method}] ${req.path} >> ${statusCode} ${message}`, {
      error: err.message,
      stack: err.stack
    });
  } else {
    logger.warn(`[${req.method}] ${req.path} >> ${statusCode} ${message}`);
  }
  
  // Customize error messages in production
  if (config.server.nodeEnv === 'production' && statusCode === 500) {
    message = 'Internal Server Error';
  }
  
  // Handle Sequelize validation errors
  let errors = null;
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 400;
    errors = err.errors.map(e => ({
      field: e.path,
      message: e.message
    }));
  }
  
  res.status(statusCode).json(createErrorResponse(
    statusCode,
    message,
    errors,
    err.stack
  ));
};

module.exports = {
  notFoundHandler,
  errorHandler,
  createErrorResponse
}; 
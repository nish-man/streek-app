const morgan = require('morgan');
const config = require('../config/config');

// Define log levels
const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
};

// Simple console logger with timestamp
const log = (level, message, meta = {}) => {
  if (typeof meta === 'object' && meta !== null && Object.keys(meta).length > 0) {
    console[level](`[${new Date().toISOString()}] [${level.toUpperCase()}]: ${message}`, meta);
  } else {
    console[level](`[${new Date().toISOString()}] [${level.toUpperCase()}]: ${message}`);
  }
};

// Logger interface
const logger = {
  error: (message, meta) => log('error', message, meta),
  warn: (message, meta) => log('warn', message, meta),
  info: (message, meta) => log('info', message, meta),
  debug: (message, meta) => {
    if (config.server.nodeEnv === 'development') {
      log('debug', message, meta);
    }
  },
};

// Morgan middleware for HTTP request logging
const httpLogger = morgan((tokens, req, res) => {
  return [
    '[HTTP]',
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ');
}, {
  skip: (req, res) => config.server.nodeEnv !== 'development'
});

module.exports = {
  ...logger,
  httpLogger,
  LOG_LEVELS,
}; 
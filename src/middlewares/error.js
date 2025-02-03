import mongoose from 'mongoose';
import config from '../config/config';
import logger from '../config/logger';
import ApiError from '../utils/ApiError';

// Error Converter Middleware
export const errorConverter = ()  => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;
    const message = error.message || 'An unexpected error occurred';
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// Error Handler Middleware
export const errorHandler = () => {
  // Prevent duplicate responses if headers are already sent
  if (res.headersSent) {
    console.log('Response has headers set. Exiting operation.');
    return next(err); // Delegate to default error handler
  }

  let { statusCode = 500, message = 'An unexpected error occurred' } = err;

  if (config.env === 'production' && !err.isOperational) {
    statusCode = 500;
    message = 'An unexpected error occurred';
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }), // Include stack trace in development
  };

  // Log the error (more detailed in development)
  logger.error({
    message: err.message,
    stack: config.env === 'development' ? err.stack : undefined,
    statusCode,
  });

  // Send error response
  res.status(statusCode).json(response);
};

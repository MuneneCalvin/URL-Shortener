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
  if (res.headersSent) {
    console.log('Response has headers set. Exiting operation.');
    return next(err); 
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
    ...(config.env === 'development' && { stack: err.stack }),
  };

  logger.error({
    message: err.message,
    stack: config.env === 'development' ? err.stack : undefined,
    statusCode,
  });


  res.status(statusCode).json(response);
};

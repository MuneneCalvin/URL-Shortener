require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/config');
const logger = require('./config/logger');
const morgan = require('./config/morgan');
import { jwtStrategy } from './config/passport';
import ApiError from './utils/ApiError';
import { errorConverter, errorHandler } from './middlewares/error';
import routes from './routes';


const app = express();
let server;

if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

// connect to MongoDB
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    logger.info('Connected to MongoDB');
    server.listen(config.port, () => {
        logger.info(`Listening to port ${config.port}`);
    });
});
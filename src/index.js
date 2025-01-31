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
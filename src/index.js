require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const timeout = require('connect-timeout');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/config');
const logger = require('./config/logger');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
// import ApiError from './utils/ApiError';
// import { errorConverter, errorHandler } from './middlewares/error';
const routes = require('./routes');


const app = express();
let expressServer;

// if (config.env !== 'test') {
//     app.use(morgan.successHandler);
//     app.use(morgan.errorHandler);
// }

// connect to MongoDB
mongoose.connect(config.mongoose.url, config.mongoose.options)
    .then(() => {
    logger.info('Connected to MongoDB');
    expressServer = app.listen(config.port, () => {
        logger.info(`Server started on port ${config.port}`);
    });
});


// set security HTTP headers
app.use(helmet());

// enable cors
app.use(cors());
app.options('*', cors());
app.use(timeout('180s'));

// parse json request body
app.use(express.json({ limit: '50mb' }));

// parse urlencoded request body
app.use(express.urlencoded({ limit: '50mb', extended: false }));

app.disable('x-powered-by');
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');
    res.header('X-Frame-Options', 'DENY'); // if its required to change, update it to SAMEORIGIN and retest
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('Strict-Transport-Security', 'max-age=15552000; includeSubDomains');
    res.header('X-DNS-Prefetch-Control', 'Off');
    res.header('X-Download-Options', 'noopen');
    res.header(
        'Content-Security-Policy',
        "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'",
    );
    return next();
});

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);


// Api routes
app.get('/', (req , res) => {
    res.send("Hello, welcome to URL Shortener............🚀👋");
});

app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    return next(new ApiError(404, 'Not Found'));
});

// convert error to ApiError, if needed
// app.use(errorConverter);

// handle error
// app.use(errorHandler);


module.exports = app;
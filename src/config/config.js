const dotenv = require('dotenv');
const path = require('path');
const Joi= require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });


const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'staging', 'development', 'test', 'preprod').required(),
        PORT: Joi.number().default(3000).required(),
        DATABASE_URL: Joi.string().required().description('Mongo DB url'),
        CLIENT_URL: Joi.string().required().description('Client Portal url'),
        JWT_SECRET: Joi.string().required().description('JWT secret key'),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
        JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number().default(10).description('minutes after which reset password token expires'),
        OTP_SERVICE_VERIFICATION_MINUTES: Joi.number().default(5).description('minutes after which OTP CODES expire'),
        JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number().default(1).description('minutes after which verify email token expires'),
        JWT_UPDATE_MISSING_DETAILS: Joi.number().default(17280).description('minutes after which verify email token expires'),
        JWT_ONBOARDING_EXPIRATION_MINUTES: Joi.number().default(4320).description('minutes after which Onboarding tokens will expire'),
        SECRET_ID_AWS: Joi.string().required().description('AWS access key id'),
        SECRET_KEY_AWS: Joi.string().required().description('AWS secret access key'),
        AWS_REGION: Joi.string().required().description('AWS region'),
        SMTP_HOST: Joi.string().description('server that will send the emails'),
        SMTP_PORT: Joi.number().description('port to connect to the email server'),
        SMTP_USERNAME: Joi.string().description('username for email server'),
        SMTP_PASSWORD: Joi.string().description('password for email server'),
        REDIS_HOST: Joi.string().required().description('Redis host'),
        REDIS_PORT: Joi.number().required().description('Redis port'),
        MPESA_CONSUMER_SECRET : Joi.string().required().description('Mpesa consumer secret'),
        MPESA_CONSUMER_KEY : Joi.string().required().description('Mpesa consumer key'),
    })
.unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    clientUrl: envVars.CLIENT_URL,
    webPush: {
        Micro_Service_Url: envVars.Micro_Service_Url,
        notificationDbProductId: envVars.NOTIFICATION_DB_PRODUCT_ID
    },
    mongoose: {
        url: envVars.DATABASE_URL,
        options: {
        autoIndex: true,
        }
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
        updateMissingDetailsMinutes: envVars.JWT_UPDATE_MISSING_DETAILS,
        onboardingExpirationMinutes: envVars.JWT_ONBOARDING_EXPIRATION_MINUTES
    },
    otp: {
        otpCodeExpirationMinutes: envVars.OTP_SERVICE_VERIFICATION_MINUTES
    },
    redis: {
        REDIS_PORT: envVars.REDIS_PORT,
        REDIS_HOST: envVars.REDIS_HOST
    },
    email: {
        smtp: {
        host: envVars.SMTP_HOST,
        port: envVars.SMTP_PORT,
        auth: {
            user: envVars.SMTP_USERNAME,
            pass: envVars.SMTP_PASSWORD
        }
        },
        from: envVars.EMAIL_FROM
    },
    aws: {
        accessKeyId: envVars.SECRET_ID_AWS,
        secretAccessKey: envVars.SECRET_KEY_AWS,
        region: envVars.AWS_REGION
    },
    mpesa: {
        consumer_secret: envVars.MPESA_CONSUMER_SECRET,
        consumer_key: envVars.MPESA_CONSUMER_KEY
    }
};


module.exports = config;
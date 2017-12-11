import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import timeout from 'connect-timeout';
import { configurePassport } from './config/passport';
import { initializeRoutes } from './router';
import { loadEnv } from './config/env';
import { customiseResponse } from './config/response';

// LOAD ENVIRONMENT VARIABLES
loadEnv();

// CONNECT MONGODB
mongoose.connect(process.env.MONGODB_URL, {
  useMongoClient: true,
});
mongoose.Promise = global.Promise;

// CREATE EXPRESS APP
const app = express();

// CONFIGURE APPLICATION
app.set('port', process.env.APP_PORT || 8000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.APP_KEY,
}));
app.use(customiseResponse);
// config passport for application
app.use(passport.initialize());
app.use(passport.session());
// timeout for request
app.use(timeout(process.env.TIMEOUT_PERIOD));
// enable CORS
app.use(cors());
configurePassport(passport);

// SETUP ROUTING
initializeRoutes(app, passport);

// START APPLICATION
app.listen(app.get('port'), () => {
  console.log(
    'App is running at %s in %s mode',
    process.env.APP_URL,
    process.env.NODE_ENV,
  );
});

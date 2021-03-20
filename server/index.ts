/* eslint-disable import/first */ // env variables should be loaded first
import express, { Application } from 'express';
import path from 'path';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import passport from 'passport';
import expressStaticGzip from 'express-static-gzip';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import cookieParser from 'cookie-parser';
import routes from './routes/all.routes';
import errorHandler from './middlewares/errorHandler';
import './config/db';

const PORT = process.env.PORT || 5000;

const app: Application = express();

// express setting
app.set('env', process.env.NODE_ENV);

app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10kb' }));
if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}
app.use(mongoSanitize()); // sanitizes user-supplied data to prevent MongoDB Operator Injection.
app.use(xss()); // sanitize user input

// rate limiter
app.set('trust proxy', 1);
app.use(
  '/api/',
  rateLimit({
    windowMs: 30 * 60 * 1000,
    max: 500,
  })
);

app.use(compression()); // compress response bodies

// passport middlewares
import './middlewares/passportAuth';
app.use(passport.initialize());

app.use('/api', routes);

// error handling
app.use(errorHandler);

// to serve gzipped React app
if (app.get('env') === 'production') {
  app.use('/', expressStaticGzip('client/build', {}));
}

if (process.env.NODE_ENV === 'production') {
  app.get('/*', function (_req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'), err => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

import path from 'path';
import fs from 'fs';
import express from 'express';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from 'config';
import mongoose from 'mongoose';

import { configPassport } from './passport';
import { initializeDatabase } from './db';
import { makeRoutes } from './routes';

mongoose.Promise = Promise;

export function initializeServer() {
  var app = express();
  
  // if (!config.has('secrets.session')) {
  //   throw new Error("Session secret not set in config file.");
  // }
  if (!config.has('secrets.jwt')) {
    throw new Error("JWT secret not set in config file.");
  }
  
  initializeDatabase();
  
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  
  app.use(passport.initialize());
  
  app.use(express.static(path.join(__dirname, '..', '..', '..', 'client', 'dist')));
  
  app.use('/api', makeRoutes(configPassport(passport)));
  
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'client', 'dist', 'index.html'))
  })
  
  // app.use((req, res, next) => {
  //   let err = new Error("Not found");
  //   err.status = 404;
  //   next(err);
  // });
  
  // if (app.get('env') === 'development') {
  //   app.use((error, req, res, next) => {
  //     res.status(error.status || 500);
  //     res.render('error', {
  //       message: error.message,
  //       error
  //     });
  //   });
  // }
  
  // app.use((err, req, res, next) => {
  //   res.status(err.status || 500);
  //   res.render('error', {
  //     message: err.message,
  //     error: {}
  //   });
  // });
  
  return app;
}
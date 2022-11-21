/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from '../routes/index.route.js';
import dbConn from '../config/db.config.js';
import error from './error.middleware.js';

/**
 * @description This do one thing onet
 * @param {Express.Application} app express app
 */
const middleware = (app) => {
  dbConn();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());

  app.use(routes);

  app.use(error);
};

export default middleware;

/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { logger } from '../app.js';

// "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath="c:\data\db"
dotenv.config();
const dbConn = () => {
  mongoose.connect('mongodb://localhost/chatApp')
    .then(() => {
      logger.info('Connected to the database');
    })
    .catch((error) => {
      logger.info('Error connecting to the databse');
      logger.error(error);
    });
};

export default dbConn;

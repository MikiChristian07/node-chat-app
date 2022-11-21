/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import { logger } from '../app.js';

export default (error, req, res, next) => {
  logger.error(error);
  return res.status(500).send({
    success: false,
    message: error.message
  });
};

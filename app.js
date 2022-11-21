import express from 'express';
import pino from 'pino';
import middleware from './middlewares/index.middlewares.js'

export const logger = pino(); 
const app = express();
const PORT = process.env.PORT || 3000;

middleware(app);
  

app.listen(PORT, () => {
    logger.info(`APP is running on port ${PORT}`);
})
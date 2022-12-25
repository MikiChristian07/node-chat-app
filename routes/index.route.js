import express from 'express';

const routes = express.Router();

routes.get('/home', (req, res) => {
  res.render('index');
});

export default routes;

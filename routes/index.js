const express = require('express');

const productsRouter = require('./products.router');
const usersRouter = require('./products.router');
const categoriesRouter = require('./products.router');

const routerApi = (app) => {
  const router = express.Router();
  // Base path
  app.use('/api', router);

  // Others path according to base paths. Ex: /api/products
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
};

module.exports = routerApi;

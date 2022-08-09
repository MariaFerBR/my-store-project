const express = require('express');

const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getroductSchema,
} = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.json("I'm a filter");
});

router.get(
  '/:id',
  validatorHandler(getroductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = await service.findOne(id);

      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const data = req.body;

    const product = await service.create(data);

    res.status(201).json({
      message: 'created',
      data: product,
    });
  }
);

router.patch(
  '/:id',
  validatorHandler(getroductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const productUpdated = await service.update(id, data);

      res.json({
        message: 'updated',
        data: productUpdated,
        id,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const productDeleted = await service.delete(id);

  res.json({
    message: 'deleted',
    productDeleted,
  });
});

module.exports = router;

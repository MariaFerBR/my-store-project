const express = require('express');

const router = express.Router();

// Get query params
router.get('/', (req, res) => {
  const { limit, offset } = req.query;

  if (limit && offset) {
    return res.json({
      limit,
      offset,
    });
  }

  res.send('No hay parametros');
});

module.exports = router;

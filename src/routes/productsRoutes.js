const express = require('express');
const { getProducts, createProduct, updateProduct} = require('../controllers/ProductController');

const productsRouter = express.Router();

productsRouter.get('/', getProducts);
// productsRouter.post('/', createProduct);
// productsRouter.put('/:id', updateProduct);


module.exports = productsRouter;





const express = require('express');
const { getProducts, addProduct, updateProduct} = require('../controllers/ProductController');

const productsRouter = express.Router();

productsRouter.get('/', getProducts);
productsRouter.post('/', addProduct);
productsRouter.put('/:id', updateProduct);


module.exports = productsRouter;





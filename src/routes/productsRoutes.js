const express = require('express');
const { getProducts, addProduct, updateProduct} = require('../controllers/ProductController');

const ProductsRouter = express.Router();

ProductsRouter.get('/', getProducts);
ProductsRouter.post('/', addProduct);
ProductsRouter.put('/:id', updateProduct);


module.exports = ProductsRouter;





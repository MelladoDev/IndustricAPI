const express = require('express');
const { getOrders, addOrder, deactivateOrder } = require('../controllers/OrderController');
const { verifyToken } = require('../middlewares/AuthMiddleware');

const orderRouter = express.Router();

orderRouter.get('/', verifyToken, getOrders);            // Obtener pedidos (solo autorizado)
orderRouter.post('/:id', verifyToken, addOrder);        // Añadir un pedido (solo autorizado)
orderRouter.delete('/:id', verifyToken, deactivateOrder); // Desactivar/eliminar pedido (solo autorizado)

module.exports = orderRouter;
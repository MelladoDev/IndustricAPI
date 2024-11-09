const { OrderModel } = require('../models/orderModel');
const { ProductModel } = require('../models/productsModel');
const { UserModel } = require('../models/userModel');

//obtener pedidos
const getOrders = async (req, res) => {
    try {
        let { limits = 10, page = 1, order_by = 'id_ASC' } = req.query;
        limits = parseInt(limits);
        page = parseInt(page);

        // Validación de entrada
        if (isNaN(limits) || isNaN(page) || limits < 1 || page < 1) {
            return res.status(400).json({ error: 'Parámetros inválidos' });
        }

        const offset = (page - 1) * limits;
        const [orderField, orderDirection] = order_by.split('_');
        
        const Orders = await OrderModel.GetAllOrders(limits, offset, orderField, orderDirection);

        const hateoas = {
            totalOrders: Orders.length,
            orders: Orders,
            links: {
                self: `/orders?limits=${limits}&page=${page}&order_by=${order_by}`,
                next: `/orders?limits=${limits}&page=${page + 1}&order_by=${order_by}`,
                previous: page > 1 ? `/orders?limits=${limits}&page=${page - 1}&order_by=${order_by}` : null,
            },
        };
        res.status(200).json(hateoas);
    } catch (error) {
        console.error('Error en getOrders:', error);
        res.status(500).json({ error: 'Error en la consulta de pedidos' });
    }
};

// Agregar pedido
const addOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Validación de existencia de producto
        ProductModel.findOne({ where: { id } }); //duda
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const newOrder = await OrderModel.CreateOrder(id, userId);
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error en addOrder:', error);
        res.status(500).json({ error: 'Error al crear el pedido' });
    }
};

// Eliminar pedido
const deactivateOrder = async (req, res) => {    
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Validación de existencia del pedido
        const order = await OrderModel.findOne({ where: { id, userId } });
        if (!order) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        const deactivateOrder = await OrderModel.DeactivateOrder(id, userId);
        res.status(200).json(deactivateOrder);
    } catch (error) {
        console.error('Error en deactivateOrder:', error);
        res.status(500).json({ error: 'Error al eliminar el pedido' });
    }
};

console.log({ getOrders, addOrder, deactivateOrder });
module.exports = { getOrders, addOrder, deactivateOrder };
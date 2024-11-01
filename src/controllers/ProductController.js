const { getAllProducts } = require('../models/productsModel');

const getProducts = async (req, res) => {
    try {
        const { limits = 10, page = 1, order_by = 'id_ASC' } = req.query;
        const offset = (page - 1) * limits;
        const [orderField, orderDirection] = order_by.split('_');
        const Productos = await getAllProducts();
        const hateoas = {
            totalProductos: Productos.length,
            productos: Productos,
            links: {
                self: `/productos?limits=${limits}&page=${page}&order_by=${order_by}`,
                next: `/productos?limits=${limits}&page=${parseInt(page) + 1}&order_by=${order_by}`,
            },
        };

        res.json(hateoas);
    } catch (error) {
        console.error('Error en getProducts:', error);
        res.status(500).json({ error: 'Error en la consulta productos' });
    }
};
const addProduct = async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await createProduct(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error en addProduct:', error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const productData = req.body;
        const updatedProduct = await updateProduct(id, productData);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error en updateProduct:', error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

// const getFilteredProducts = async (req, res) => {
//     try {
//         const { precio_max, precio_min, categoria } = req.query;
//         const productosFiltrados = await getFilteredProductsFromDB(precio_min, precio_max, categoria);

//         res.json(productosFiltrados);
//     } catch (error) {
//         console.error('Error en getFilteredProducts:', error);
//         res.status(500).json({ error: 'Error en la consulta productos filtrados' });
//     }
// };

console.log({ getProducts, addProduct, updateProduct });
module.exports = { getProducts , addProduct, updateProduct };

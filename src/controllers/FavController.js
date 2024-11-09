const { FavModel } = require('../models/FavModel');
const { ProductModel } = require('../models/productsModel');
const { UserModel } = require('../models/userModel');

//obtener favoritos
const getFavs = async (req, res) => {
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
        
        const Favs = await FavModel.GetAllFavs(limits, offset, orderField, orderDirection);

        const hateoas = {
            totalFavs: Favs.length,
            favs: Favs,
            links: {
                self: `/favs?limits=${limits}&page=${page}&order_by=${order_by}`,
                next: `/favs?limits=${limits}&page=${page + 1}&order_by=${order_by}`,
                previous: page > 1 ? `/favs?limits=${limits}&page=${page - 1}&order_by=${order_by}` : null,
            },
        };
        res.status(200).json(hateoas);
    } catch (error) {
        console.error('Error en getFavs:', error);
        res.status(500).json({ error: 'Error en la consulta de favoritos' });
    }
};

// Agregar favorito
const addFav = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Validación de existencia de producto
        ProductModel.findOne({ where: { id } }); //duda
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const newFav = await FavModel.CreateFav(id, userId);
        res.status(201).json(newFav);
    } catch (error) {
        console.error('Error en addFav:', error);
        res.status(500).json({ error: 'Error al crear el favorito' });
    }
};

// Eliminar favorito
const deactivateFav = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Validación de existencia del favorito
        const fav = await FavModel.findOne({ where: { id, userId } });
        if (!fav) {
            return res.status(404).json({ error: 'Favorito no encontrado' });
        }

        const deactivateFav = await FavModel.DeactivateFav(id, userId);
        res.status(200).json(deactivateFav);
    } catch (error) {
        console.error('Error en deactivateFav:', error);
        res.status(500).json({ error: 'Error al eliminar el favorito' });
    }
};

console.log({ getFavs, addFav, deactivateFav });
module.exports = { getFavs, addFav, deactivateFav };

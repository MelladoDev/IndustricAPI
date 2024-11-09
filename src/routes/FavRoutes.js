const express = require('express');
const { getFavs, addFav, deactivateFav } = require('../controllers/FavController');
const { verifyToken } = require('../middlewares/AuthMiddleware');

const favRouter = express.Router();

favRouter.get('/', verifyToken, getFavs);            // Obtener favoritos (solo autorizado)
favRouter.post('/:id', verifyToken, addFav);        // Añadir un favorito (solo autorizado)
favRouter.delete('/:id', verifyToken, deactivateFav); // Desactivar/eliminar favorito (solo autorizado)

module.exports = favRouter;
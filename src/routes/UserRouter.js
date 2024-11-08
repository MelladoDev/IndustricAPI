const express = require('express');
const { register, login, getUser } = require('../controllers/AuthController');
const {updateUser, deactivateUser} = require('../controllers/UserController');
const { verifyToken } = require('../middlewares/AuthMiddleware');


const UserRouter = express.Router();


UserRouter.post('/register', register);

UserRouter.post('/login', login);

UserRouter.get('/:id', verifyToken, getUser);

UserRouter.put('/:id', verifyToken, updateUser);

UserRouter.put('/:id/deactivate', verifyToken, deactivateUser);

module.exports = UserRouter;






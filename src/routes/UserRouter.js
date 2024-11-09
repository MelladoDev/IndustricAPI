const express = require('express');
const { register, login, getUser } = require('../controllers/AuthController');
const { updateUserController, deactivateUser, getAllUsersController} = require('../controllers/UserController');
const { verifyToken } = require('../middlewares/AuthMiddleware');
const { getUserController } = require('../controllers/UserController');

const UserRouter = express.Router();


UserRouter.post('/register', register);

UserRouter.post('/login', login);

UserRouter.get('/:id', getUserController);
// UserRouter.get('/:id', getUser);
// UserRouter.get('/:id', verifyToken, getUser);

UserRouter.get('/',  getAllUsersController);


UserRouter.put('/:id', verifyToken, updateUserController);

UserRouter.put('/:id/deactivate', verifyToken, deactivateUser);

module.exports = UserRouter;
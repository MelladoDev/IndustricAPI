const express = require('express');
const { register, login, getUser } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');


const UserRouter = express.Router();


UserRouter.post('/register', register);

UserRouter.post('/login', login);

UserRouter.get('/', verifyToken, getUser);

module.exports = UserRouter;
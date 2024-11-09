const { getUser, getAllUsers, findByEmail, createUser, updateUser, updateUserCondition } = require('../models/userModel');
const bcrypt = require('bcryptjs');

const getUserController = async (req, res) => {
  console.log('req.paramsController: ',req.params);
  try {
    const { id } = req.params;// Extrae el id de los parámetros de la ruta
    console.log('idFromReq.Params: ',id);
    console.log('idFromReq.Params type: ',typeof id);
    const result = await getUser(parseInt(id));// Llama a la función getUser del module pasandole el id
    if (result.length === 0) {// Verifica si el resultado está vacío
      // return res.status(404).json({ message: 'Usuario no encontrado' });
      return res.status(404).json({ status: 404, message: 'Usuario no encontrado' });
    }else{
      // Devuelve el resultado en formato JSON
      return res.status(200).json({ status: 200, result });
      res.json(result);
    }
  } catch (error) {
    // Maneja cualquier error que ocurra
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
};

// evitar email repetidos
const findByEmailController = async (email) => {
  const result = await findByEmail(email);
  return result;
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    // console.log('usrs bef lenght: ',users);
    if (users.length > 0) {
      return res.status(200).json({ status: 200, users });
    } else {
      return res.status(404).json({ status: 404, message: 'No hay usuarios' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, message: 'Error al obtener los usuarios' });
  }
};
//crear usuario  
const createUserController = async (req, res) => {
  try {
    const { nombre, email, password } = req.body; 

    const existingUser = await findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado.' });
    }

// encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await UserModel.createUser(
      nombre,
      email,
      hashedPassword
    );
    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
};

//actualizando usuario
const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Encriptar la nueva contraseña si se proporciona
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const result = await UserModel.updateUser(
      id,
      name,
      email,
      hashedPassword
    );

    if (result.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
  };

  //eliminar usuario
  const deactivateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const newCondition = req.body;
    const deactivateUser = await UserModel.updateUserCondition(id, newCondition);
    res.json(deactivateUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};


module.exports = { getUserController, getAllUsersController, findByEmail, createUserController, updateUserController, deactivateUser };
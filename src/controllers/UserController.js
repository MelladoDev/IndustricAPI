const { UserModel } = require('../models/userModel');
const bcrypt = require('bcryptjs');

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UserModel.getUser(id);
    if (result.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
};

// evitar email repetidos
const findByEmail = async (email) => {
  const result = await UserModel.findByEmail(email);
  return result;
};

//crear usuario  
const createUser = async (req, res) => {
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
const updateUser = async (req, res) => {
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

console.log({ getUser, findByEmail, createUser, updateUser, deactivateUser });
module.exports = { getUser, findByEmail, createUser, updateUser, deactivateUser };
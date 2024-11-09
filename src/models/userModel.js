const pool = require('../db/DbConnection');
const bcrypt = require('bcryptjs');


//obtener usuario
const getUser = async (req, res) => {
  try {
    const { id } = req.params.id;
    const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.json({ status : 404, message: 'Usuario no encontrado' });
    }
    else{
      return res.json(result.rows[0]);
    }
  } catch (error) {
    let message = 'Error al obtener el usuario';
    return message;
  }
};

// evitar email repetidos
const findByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  return result.rows[0];
};

// Obtener todos los usuarios
const getAllUsers = async () => {
  const query = `
    SELECT * FROM Usuarios
  `;

  // Ejecutar la consulta
  const response = await pool.query(query);
  // console.log('usrModelQueryResp: ',response.rows); // Para imprimir el número de filas
  return response.rows;
};

//crear usuario  
const createUser = async (req, res) => {
    const { nombre, email, password } = req.body; 

    const existingUser = await findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado.' });
    }

// encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO Usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *',
      [nombre, email, hashedPassword ]
    );
    return res.status(201).json(result.rows[0]);
};

//actualizando usuario
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Encriptar la nueva contraseña si se proporciona
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const result = await pool.query(
      `UPDATE usuarios
       SET nombre = $1, email = $2, password = COALESCE($3, password)
       WHERE id = $4
       RETURNING *;`,
      [name, email, hashedPassword, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};

// eliminar usuario
const updateUserCondition = async (newCondition, userId) => {
  const query = `
  UPDATE usuarios 
  SET condicion = $1
  WHERE id = $2
  RETURNING *;
  `;
  try {
    const result = await pool.query(query, [newCondition, userId]);
    if (result.rows.length === 0) { 
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
  
};


module.exports = { getUser, getAllUsers, findByEmail, createUser, updateUser, updateUserCondition };

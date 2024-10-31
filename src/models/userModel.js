const pool = require('../db/db');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO Usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *',
      [nombre, email, hashedPassword ]
    );
    return result.rows[0];
  }

  // async findByEmail(email) {
  //   const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  //   return result.rows[0];
  // }
;
const updateUser = async (req, res) => {
  const { id } = req.params; // Obtener ID del usuario desde los parámetros de la ruta
  const { name, email, password, age } = req.body; // Obtener datos actualizados desde el cuerpo de la solicitud

  try {
    const result = await pool.query(
      `UPDATE usuarios
       SET nombre = $1, email = $2, contraseña = $3 
       WHERE id = $4
       RETURNING *;`,
      [name, email, password, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]); // Devolver el usuario actualizado
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};

module.exports = {createUser, updateUser};

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const pool = require('./../db/db');



exports.register = async (req, res) => {
  const { nombre, email, password} = req.body;
  try {
    const userExists = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (userExists.rowCount > 0) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *',
      [ nombre, email, hashedPassword ]
    );

    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error('Error al registrar usuario:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Credenciales incorrectas' });

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findByEmail(req.user.email);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

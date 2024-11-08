const pool = require('../db/DbConnection');

const AdminModel = () => {
  //obtener todos los admin
  const getAllAdmins = async () => {
    try {
      const query = `SELECT * FROM admin;`;
      const response = await pool.query(query);
      return response.rows[0];
    } catch (error) {
      console.error("Error en getAllAdmins:", error);
      res
        .status(500)
        .json({ error: "Error en la consulta de todos los admin" });
    }
  };

  //obtener un admin
  const getAdmin = async (id) => {
    const query = `
    SELECT * FROM admin
    WHERE id = $1;
    `;
    const response = await pool.query(query, [id]);
    return response.rows[0];
  };

  //agregar un admin
  const createAdmin = async (adminData) => {
    const { nombre, email, contraseña } = adminData;
    const query = `
      "INSERT INTO admin ( nombre, email, contraseña ) 
      VALUES ($1, $2, $3) 
      RETURNING *;
      `;
    const result = await pool.query(query, [
      nombre,
      email,
      contraseña,
    ]);
    return result.rows[0];
  };

  //actualizar un admin
  const updateAdmin = async (id, adminData) => {
    try {
      const { nombre, email, contraseña } = adminData;
      const result = await pool.query(
        `UPDATE admin 
                SET nombre = $1, email = $2, contraseña = $3 
                WHERE id = $4 
                RETURNING *;`,
        [nombre, email, contraseña, id]
      );
      if (result.rows.length === 0) {
        console.error("Error en updateAdmin:", error);
        res.status(500).json({ error: "No se encontró el admin" });
      }
      return result.rows[0];
    } catch (error) {
      console.error("Error en updateAdmin:", error);
      res.status(500).json({ error: "No se ha podido actualizar el admin" });
    }
  };

  //eliminar un admin
  const updateAdminCondition = async (newCondition, adminId, res) => {
    const query = `
     UPDATE admin
     SET condicion = $1
     WHERE id = $2
     RETURNING *;
   `;
    try {
      const result = await pool.query(query, [newCondition, adminId]);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Admin no encontrado" });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el admin" });
    }
  };
};      

module.exports = { AdminModel };
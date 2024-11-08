import pool from "../db/DbConnection";

const CategoryModel = () => {
  //obtener todos las categorías
  const getAllCategories = async () => {
    try {
      const query = `SELECT * FROM categorias;`;
      const response = await pool.query(query, [id]);
      return response.rows[0];
    } catch (error) {
      console.error("Error en getAllCatergories:", error);
      res
        .status(500)
        .json({ error: "Error en la consulta de todas las categorías" });
    }
  };

  //obtener una categoría
  const getCategory = async (id) => {
    const query = `
    SELECT * FROM categorias
    WHERE id = $1;
    `;
    const response = await pool.query(query, [id]);
    return response.rows[0];
  };

  //agregar una categoría
  const createCategory = async (categoryData) => {
    const { nombre, descripcion } = categoryData;
    const query = `
      "INSERT INTO categorias ( nombre, descripcion )
       VALUES ($1, $2) 
       RETURNING *;
      `;
    const result = await pool.query(query, [nombre, descripcion]);
    return result.rows[0];
  };

  //actualizar una categoría
  const updateCategory = async (id, categoryData) => {
    try {
      const { nombre, descripcion } = categoryData;
      const result = await pool.query(
        "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
        [nombre, descripcion, id]
      );
      if (result.rows.length === 0) {
        console.error("Error en updateCategory:", error);
        res.status(500).json({ error: "No se encontró la categoría" });
      }
      return result.rows[0];
    } catch (error) {
      console.error("Error en updateCategory:", error);
      res
        .status(500)
        .json({ error: "No se ha podido actualizar la categoría" });
    }
  };

  //eliminar una categoría
  const updateFavCondition = async (newCondition, categoryId, res) => {
    const query = `
     UPDATE categorias
     SET condicion = $1
     WHERE id = $2
     RETURNING *;
    `;
    try {
      const result = await pool.query(query, [newCondition, categoryId]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "categoría no encontrada" });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar la categoría" });
    }
  };



};





module.exports = { CategoryModel };

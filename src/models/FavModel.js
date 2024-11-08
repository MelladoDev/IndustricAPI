const pool = require("../db/DbConnection");

const FavModel = () => {
  //obtener favoritos
const getFav = async (id, res) => {
  try {
    const query = `
      SELECT * FROM favoritos 
      WHERE id = $1;
    `;
    const response = await pool.query(query, [id]);

    if (response.rows.length === 0) {
      return res.status(404).json({ message: "Favorito no encontrado" });
    }

    res.json(response.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los favoritos" });
  }
};


  //agregar favorito
  const createFav = async (favData) => {
    try {
      const { usuario_id, producto_id } = favData;

      const query = `
          INSERT INTO favoritos (usuario_id, producto_id)
          VALUES ($1, $2)
          RETURNING *;
        `;

      const result = await pool.query(query, [usuario_id, producto_id]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error("Error al agregar el favorito");
    }
  };

  //"eliminar favorito"
const updateFavCondition = async (newCondition, favId, res) => {
  const query = `
    UPDATE favoritos
    SET condicion = $1
    WHERE id = $2
    RETURNING *;
  `;
  try {
    const result = await pool.query(query, [newCondition, favId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Favorito no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el favorito" });
  }
};
};

module.exports = { FavModel };

import pool from "../db/DbConnection";

const CotizacionModel = () => {
  //obtener todos las cotizaciones
  const getAllCotizaciones = async (id) => {
    try {
      const query = `SELECT * FROM cotizacion;`;
      const response = await pool.query(query, [id]);
      return response.rows[0];
    } catch (error) {
      console.error("Error en getAllCotizaciones:", error);
      res
        .status(500)
        .json({ error: "Error en la consulta de todas las cotizaciones" });
    }
  };

  //obtener una cotización
  const getCotizacion = async (id) => {
    const query = `
    SELECT * FROM cotizacion
    WHERE id = $1;
    `;
    const response = await pool.query(query, [id]);
    return response.rows[0];
  };

  //agregar una cotización
  const createCotizacion = async (cotizacionData) => {
    const { marca, cilindro, modelo, año, usuario_id, estado } = cotizacionData;
    const query = `
      "INSERT INTO cotizacion ( marca, cilindro, modelo, año, usuario_id, estado ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
      `;
    const result = await pool.query(query, [
      marca,
      cilindro,
      modelo,
      año,
      usuarioid,
      estado,
    ]);
    return result.rows[0];
  };

  //actualizar una cotización
  const updateCotizacion = async (id, cotizacionData) => {
    try {
      const { marca, cilindro, modelo, año, usuario_id, estado } =
        cotizacionData;
      const result = await pool.query(
        `UPDATE cotizacion 
                SET marca = $1, cilindro = $2, modelo = $3, año = $4, usuario_id = $5, estado = $6 
                WHERE id = $7 
                RETURNING *;`,
        [marca, cilindro, modelo, año, usuario_id, estado, id]
      );
      if (result.rows.length === 0) {
        console.error("Error en updateCotizacion:", error);
        res.status(500).json({ error: "No se encontró la cotización" });
      }
      return result.rows[0];
    } catch (error) {
      console.error("Error en updateCotizacion:", error);
      res
        .status(500)
        .json({ error: "No se ha podido actualizar la cotización" });
    }
  };

  //eliminar una cotización
  const updateCotizacionCondition = async (newCondition, cotizacionId, res) => {
    const query = `
     UPDATE cotizacion
     SET condicion = $1
     WHERE id = $2
     RETURNING *;
   `;
 try {
   const result = await pool.query(query, [newCondition, cotizacionId]);

   if (result.rows.length === 0) {
     return res.status(404).json({ message: "cotización no encontrada" });
   }

   res.json(result.rows[0]);
 } catch (error) {
   console.error(error);
   res.status(500).json({ message: "Error al eliminar la cotización" });
 }
};
};



module.exports = { CotizacionModel };

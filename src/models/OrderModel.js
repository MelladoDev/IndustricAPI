import pool from "../db/DbConnection";

const OrderModel = () => {

const getOrder = async (id) => {
  const query = `
    SELECT * FROM pedidos
    WHERE id = $1;
    `;
  const response = await pool.query(query, [id]);
  return response.rows[0];
};

const getAllOrders = async (id) => {
  try {
    const query = `SELECT * FROM pedidos;`;
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error("Error en getAllOrders:", error);
    res
      .status(500)
      .json({ error: "Error en la consulta de todos los pedidos" });
  }
};

const createOrder = async (orderData) => {
  // el json que se recibe lo desestructuramos con las llaves y obtenemos los valores
  const { usuario_id, total, fecha_pedido, estado } = orderData;

  const query = `
      INSERT INTO pedidos (usuario_id, total, fecha_pedido, estado, condicion)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

  const result = await pool.query(query, [
    usuario_id,
    total,
    fecha_pedido,
    estado,
  ]);
  return result.rows[0];
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario_id, total, fecha_pedido, estado } = req.body;
    const result = await pool.query(
      `UPDATE Pedidos
                SET usuario_id = $1, total = $2, fecha_pedido = $3, estado = $4, 
                WHERE id = $5
                RETURNING *;`,
      [usuario_id, total, fecha_pedido, estado, id]
    );
    if (result.rows.length === 0) {
      console.error("Error en updateOrder:", error);
      res.status(500).json({ error: "No se encontró el pedido" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error en updateOrder:", error);
    res.status(500).json({ error: "Error al actualizar el pedido" });
  }
};

//"Delete" order
const updateOrderCondition = async (newCondition, orderId) => {     
    const query = ` 
      UPDATE pedidos     
      SET condicion = $1     
      WHERE id = $2
      RETURNING *;
      `;
      try {
        const result = await pool.query(query, [newCondition, orderId]);
        if (result.rows.length === 0) {
          return res.status(404).json({ message: "Pedido no encontrado" });
        }
        res.json(result.rows[0]);
      } catch (error) {
        console.error("Error en updateOrderCondition:", error);
        res
          .status(500)
          .json({
            error: "Error en la actualizacion de la condicion de una orden",
          });
      }
      };
};

module.exports = { OrderModel };


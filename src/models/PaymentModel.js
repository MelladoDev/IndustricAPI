const pool = require('../db/DbConnection');

const PaymentModel = () => {
  //obtener todos los pagos
  const getAllPayments = async (id) => {
    try {
      const query = `SELECT * FROM pagos;`;
      const response = await pool.query(query, [id]);
      return response.rows[0];
    } catch (error) {
      console.error("Error en getAllPayments:", error);
      res
        .status(500)
        .json({ error: "Error en la consulta de todos los pagos" });
    }
  };

  //obtener un pago
  const getPayment = async (id) => {
    const query = `
    SELECT * FROM pagos
    WHERE id = $1;
    `;
    const response = await pool.query(query, [id]);
    return response.rows[0];
  };

  //agregar un pago
  const createPayment = async (paymentData) => {
    const { pedido_id, metodo_pago, monto, estado } = paymentData;
    const query = `
      "INSERT INTO pagos ( pedido_id, metodo_pago, monto, estado ) VALUES ($1, $2, $3, $4) RETURNING *;
      `;
    const result = await pool.query(query, [
      pedido_id,
      metodo_pago,
      monto,
      estado,
    ]);
    return result.rows[0];
  };

  //actualizar un pago
  const updatePayment = async (id, paymentData) => {
    try {
      const { pedido_id, metodo_pago, monto, estado } = paymentData;
      const result = await pool.query(
        `UPDATE pagos 
                SET pedido_id = $1, metodo_pago = $2, monto = $3, estado = $4 
                WHERE id = $5 
                RETURNING *;`,
        [pedido_id, metodo_pago, monto, estado, id]
      );
      if (result.rows.length === 0) {
        console.error("Error en updatePayment:", error);
        res.status(500).json({ error: "No se encontró el pago" });
      }
      return result.rows[0];
    } catch (error) {
      console.error("Error en updatePayment:", error);
      res.status(500).json({ error: "No se ha podido actualizar el pago" });
    }
  };

  //eliminar un pago
  const updatePaymentCondition = async (newCondition, paymentId, res) => {
    const query = `
     UPDATE pagos
     SET condicion = $1
     WHERE id = $2
     RETURNING *;
   `;
    try {
      const result = await pool.query(query, [newCondition, paymentId]);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Pago no encontrado" });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el pago" });
    }
  };
};

module.exports = { PaymentModel };

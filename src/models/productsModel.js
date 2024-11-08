const pool = require('../db/DbConnection');

const ProductModel = () => {
  //obteniendo todos los productos
  const GetAllProducts = async (limits = 10, offset = 0, orderField = 'id', orderDirection = 'ASC') => {
    const validOrderFields = ['id', 'nombre', 'precio', 'categoria_id'];
    const validOrderDirections = ['ASC', 'DESC'];
    
    if (!validOrderFields.includes(orderField)) orderField = 'id';
    if (!validOrderDirections.includes(orderDirection)) orderDirection = 'ASC';
  

      const query = `
      SELECT * FROM Productos
      ORDER BY ${orderField} ${orderDirection}
      LIMIT $1 OFFSET $2;
      `;
      const response = await pool.query(query, [limits, offset]);
      return response.rows;
  };

  //agregar producto
  const CreateProduct = async (productData) => {
      const { nombre, imagen_url, descripcion, precio, categoria_id, stock } = productData;
      
      const query = `
        INSERT INTO Productos ( nombre, imagen_url, descripcion, precio, categoria_id, stock)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `;
    
      const result = await pool.query(query, [ nombre, imagen_url, descripcion, precio, categoria_id, stock]);
      return result.rows[0];
    };

  //actualizar producto
  const UpdateProduct = async (req, res) => {
      const { id } = req.params;
      const { nombre, imagen_url, descripcion, precio, categoria_id, stock } = req.body;
      const result = await pool.query(
        `UPDATE Productos
        SET nombre = $1, imagen_url = $2, descripcion = $3, precio = $4, categoria_id = $5, stock = $6
        WHERE id = $7
        RETURNING *;`,
        [nombre, imagen_url, descripcion, precio, categoria_id, stock, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json(result.rows[0]);
    };
  }

module.exports = { ProductModel };
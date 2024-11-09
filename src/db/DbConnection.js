const { Pool } = require('pg');
require("dotenv").config({ path: "server.env" });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

async function testConnection() {
  try {
    const client = await pool.connect();  
    console.log('Conexión a la base de datos establecida con éxito');
    client.release(); 
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error.message);
  }
}
testConnection();
module.exports = pool;
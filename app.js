const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const UserRouter = require('./src/routes/UserRouter');
const productsRouter = require('./src/routes/productsRoutes');
const handleLog = require('./src/middlewares/handleLog');


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(handleLog);
app.use('/api/v1/users', UserRouter);    
app.use('/api/v1/products', productsRouter);


const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
}); 
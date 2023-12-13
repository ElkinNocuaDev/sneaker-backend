const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });

// Middleware para parsear JSON
app.use(express.json());

// Middleware para habilitar CORS
app.use(cors());

// Rutas
const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

// Iniciar el servidor en un puerto aleatorio
const server = app.listen(0, () => {
  // No se imprimirá el puerto en la consola
  console.log('Servidor escuchando en un puerto aleatorio');
});


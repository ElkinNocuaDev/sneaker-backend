const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


// Ruta para obtener el precio especial de un producto para un usuario
router.get('/price/:user_id/:nombre_producto', productController.getPrice);

// Ruta para obtener productos en stock
router.get('/products', productController.getProducts);

module.exports = router;

const Product = require('../models/Product');

// Obtener productos en stock
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ inStock: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// Obtener precio especial de un producto para un usuario
exports.getPrice = async (req, res) => {
  const { user_id, nombre_producto } = req.params;

  try {
    const product = await Product.findOne({ name: nombre_producto });

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    let price = product.basePrice;
    let specialPrices = {};

    // Verificar si specialPrices está definido y no es null
    if (product.specialPrices && Object.keys(product.specialPrices).length > 0) {
      specialPrices = product.specialPrices;

      // Si hay precios especiales, intentar obtener el precio especial para la marca
      if (specialPrices[user_id] && specialPrices[user_id][product.brand] !== undefined) {
        price = specialPrices[user_id][product.brand];
      }
    }

    // Enviar la respuesta con el precio y los precios especiales
    res.json({ price, specialPrices });
  } catch (error) {
    console.error('Error al obtener el precio:', error);
    res.status(500).json({ error: `Error al obtener el precio: ${error.message}` });
  }
};


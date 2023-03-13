const express = require('express');
const products = require('./products.json');

const app = express();

// Endpoint para obtener todos los productos
app.get('/products', (req, res) => {
  // Si no se especifica ningún query, devolver todos los productos
  if (!req.query.limit) {
    return res.json(products);
  }
  // Si se especifica el query "limit", devolver los primeros n productos
  const limit = parseInt(req.query.limit);
  return res.json(products.slice(0, limit));
});

// Endpoint para obtener un producto por su id
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  // Buscar el producto con el id especificado
  const product = products.find(p => p.id === id);
  if (!product) {
    // Si no se encuentra el producto, devolver un mensaje de error
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  // Si se encuentra el producto, devolverlo
  return res.json(product);
});

// Iniciar el servidor en el puerto 8080
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

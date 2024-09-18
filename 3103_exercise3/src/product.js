const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

let products = [];

app.post('/products', (req, res) => {
  const product = { id: products.length + 1, ...req.body };
  products.push(product);
  res.status(201).json(product);
});

app.get('/products/:productId', (req, res) => {
  const product = products.find(p => p.id == req.params.productId);
  if (!product) return res.status(404).send('Product not found');
  res.json(product);
});

app.put('/products/:productId', (req, res) => {
  const product = products.find(p => p.id == req.params.productId);
  if (!product) return res.status(404).send('Product not found');

  Object.assign(product, req.body);
  res.json(product);
});

app.delete('/products/:productId', (req, res) => {
  products = products.filter(p => p.id != req.params.productId);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Product service running on port ${port}`);
});
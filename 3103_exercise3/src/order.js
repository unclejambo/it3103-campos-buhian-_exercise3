const express = require('express');
const axios = require('axios');
const app = express();
const port = 3003;

app.use(express.json());

let orders = [];


app.post('/orders', async (req, res) => {
  const { customerId, productId, quantity } = req.body;

  try {
    const customerResponse = await axios.get(`http://localhost:3002/customers/${customerId}`);
    const productResponse = await axios.get(`http://localhost:3001/products/${productId}`);


    if (!customerResponse.data || !productResponse.data) {
      return res.status(400).send('Invalid customer or product');
    }

    const order = { id: orders.length + 1, customerId, productId, quantity };
    orders.push(order);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).send('Invalid customer or product');
  }
});

app.get('/orders/:orderId', (req, res) => {
  const order = orders.find(o => o.id == req.params.orderId);
  if (!order) return res.status(404).send('Order not found');
  res.json(order);
});

app.put('/orders/:orderId', (req, res) => {
  const order = orders.find(o => o.id == req.params.orderId);
  if (!order) return res.status(404).send('Order not found');

  Object.assign(order, req.body);
  res.json(order);
});

app.delete('/orders/:orderId', (req, res) => {
  orders = orders.filter(o => o.id != req.params.orderId);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Order service running on port ${port}`);
});
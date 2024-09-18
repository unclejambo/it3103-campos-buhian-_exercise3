const express = require('express');
const app = express();
const port = 3002;

app.use(express.json());

let customers = [];

app.post('/customers', (req, res) => {
  const customer = { id: customers.length + 1, ...req.body };
  customers.push(customer);
  res.status(201).json(customer);
});

app.get('/customers/:customerId', (req, res) => {
  const customer = customers.find(c => c.id == req.params.customerId);
  if (!customer) return res.status(404).send('Customer not found');
  res.json(customer);
});

app.put('/customers/:customerId', (req, res) => {
  const customer = customers.find(c => c.id == req.params.customerId);
  if (!customer) return res.status(404).send('Customer not found');

  Object.assign(customer, req.body);
  res.json(customer);
});

app.delete('/customers/:customerId', (req, res) => {
  customers = customers.filter(c => c.id != req.params.customerId);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Customer service running on port ${port}`);
});
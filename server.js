const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: './config/config.env'});

const PORT = process.env.PORT || 5000;

const app = express();

app.get('/api/v1/users', (req, res) => {
  res.status(200).json({success: true, msg: 'Get all Users'})
});

app.get('/api/v1/users/:id', (req, res) => {
  res.status(200).json({success: true, msg: `Get single user by ID: ${req.params.id}` });
});

app.post('/api/v1/users', (req, res) => {
  res.status(200).json({success: true, msg: 'Create new user'})
});

app.put('/api/v1/users/:id', (req, res) => {
  res.status(200).json({success: true, msg: `Update user by ID: ${req.params.id}` })
});

app.delete('/api/v1/users/:id', (req, res) => {
  res.status(200).json({success: true, msg: `Delete user by ID: ${req.params.id}` })
});

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
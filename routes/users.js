const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({success: true, msg: 'Get all Users'})
});

router.get('/:id', (req, res) => {
  res.status(200).json({success: true, msg: `Get single user by ID: ${req.params.id}` });
});

router.post('/', (req, res) => {
  res.status(200).json({success: true, msg: 'Create new user'})
});

router.put('/:id', (req, res) => {
  res.status(200).json({success: true, msg: `Update user by ID: ${req.params.id}` })
});

router.delete('/:id', (req, res) => {
  res.status(200).json({success: true, msg: `Delete user by ID: ${req.params.id}` })
});

module.exports = router;
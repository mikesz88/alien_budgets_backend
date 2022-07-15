const express = require('express');
const router = express.Router();
const filteredResults = require('../middleware/filteredResults');
const Student = require('../models/Student');

const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/students');

const { protect, authorizedAdult } = require('../middleware/auth');

router.route('/')
  .get(protect, authorizedAdult(), filteredResults(Student), getStudents);
  
router.route('/:id')
  .get(protect, authorizedAdult(), getStudent);

module.exports = router;
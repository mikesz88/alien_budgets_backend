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

const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, authorize('adult'), filteredResults(Student), getStudents);
  
router.route('/:id')
  .get(protect, authorize('adult'), getStudent);

module.exports = router;
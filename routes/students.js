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

router.route('/')
  .get(filteredResults(Student), getStudents)
  .post(createStudent);

router.route('/:id')
  .get(getStudent)
  .put(updateStudent)
  .delete(deleteStudent);

module.exports = router;
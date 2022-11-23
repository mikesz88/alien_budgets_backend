const express = require('express');
const router = express.Router();

const {
  resetStudentPassword,
  updateStudentByAdult,
  validateEmail,
} = require('../controllers/adults');

const { protect, authorizedAdult } = require('../middleware/auth');

router.get('/validateemail/:email', validateEmail);

router.put(
  '/updatestudent/:studentid',
  protect,
  authorizedAdult,
  updateStudentByAdult
);

router.put('/:studentid', protect, authorizedAdult, resetStudentPassword);

module.exports = router;

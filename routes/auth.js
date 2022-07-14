const express = require('express');

const { 
  registerAdult, 
  registerStudent,
  login 
} = require('../controllers/auth');

const router = express.Router();

router.post('/register/adult', registerAdult);
router.post('/register/student', registerStudent);
router.post('/login', login);

module.exports = router;
const express = require('express');

const { 
  registerAdult, 
  registerStudent, 
} = require('../controllers/auth');

const router = express.Router();

router.post('/register/adult', registerAdult);
router.post('/register/student', registerStudent);

module.exports = router;
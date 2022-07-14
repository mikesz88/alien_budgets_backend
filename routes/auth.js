const express = require('express');

const { 
  registerAdult, 
  registerStudent,
  login,
  getLoggedInUser 
} = require('../controllers/auth');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register/adult', registerAdult);
router.post('/register/student', registerStudent);
router.post('/login', login);
router.get('/me', protect, getLoggedInUser);

module.exports = router;
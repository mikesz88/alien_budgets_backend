const express = require('express');

const { 
  registerAdult, 
  registerStudent,
  login,
  getLoggedInUser,
  adultForgotPassword,
  resetPassword,
  forgotPassword,
  forgotQuestion
} = require('../controllers/auth');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register/adult', registerAdult);
router.post('/register/student', registerStudent);
router.post('/login', login);
router.get('/me', protect, getLoggedInUser);
router.post('/adult/forgotpassword', adultForgotPassword);
router.post('/forgotpassword', forgotPassword);
router.put('/forgotquestion', forgotQuestion);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
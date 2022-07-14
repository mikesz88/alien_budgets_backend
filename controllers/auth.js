const Adult = require('../models/Adult');
const Student = require('../models/Student');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc Register Adult
// @route POST /api/v1/auth/register/adult
// @access PUBLIC
exports.registerAdult = asyncHandler(async (req, res, next) => {

  const { 
    firstName,
    lastName,
    email,
    password,
    avatarURL,
    avatarColor,
    gradeLevel,
    forgotPasswordQuestion,
    forgotPasswordAnswer
  } = req.body; 

  const user = await Adult.create({
    firstName,
    lastName,
    email,
    password,
    avatarURL,
    avatarColor,
    gradeLevel,
    forgotPasswordQuestion,
    forgotPasswordAnswer
  });

  const token = user.getSignedJwt();

  res.status(200).json({ 
    success: true, 
    data: user, 
    token });

});

// @desc Register Student
// @route POST /api/v1/auth/register/student
// @access PUBLIC
exports.registerStudent = asyncHandler(async (req, res, next) => {

  const { 
    firstName,
    lastInitial,
    username,
    password,
    avatarURL,
    avatarColor,
    classroomCode,
    forgotPasswordQuestion,
    forgotPasswordAnswer
  } = req.body; 

  const user = await Student.create({
    firstName,
    lastInitial,
    username,
    password,
    avatarURL,
    avatarColor,
    classroomCode,
    forgotPasswordQuestion,
    forgotPasswordAnswer
  });

  const token = user.getSignedJwt();

  res.status(200).json({ 
    success: true, 
    data: user, 
    token });

});

// @desc Login Student
// @route POST /api/v1/auth/login
// @access PUBLIC
exports.login = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { email, username, password } = req.body;

  if (!(!username || !email) || !password) {
    return next(new ErrorResponse('Please provide a username and password'))
  }

  const user = email 
  ? await Adult.findOne({ email }).select('+password') 
  : await Student.findOne({ username }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid Credentials'), 401)
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse('Invalid Credentials'), 401)
  }

  const token = user.getSignedJwt();

  res.status(200).json({ 
    success: true, 
    data: user, 
    token });
    
});
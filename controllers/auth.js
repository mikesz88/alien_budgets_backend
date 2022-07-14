const Adult = require('../models/Adult');
const Student = require('../models/Student');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc Register Adult
// @route GET /api/v1/auth/register/adult
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

  res.status(200).json({ success: true, data: user });

});

// @desc Register Student
// @route GET /api/v1/auth/register/student
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

  res.status(200).json({ success: true, data: user });

});
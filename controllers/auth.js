const Adult = require('../models/Adult');
const Student = require('../models/Student');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

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

  sendTokenResponse(user, 200, res);

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

  sendTokenResponse(user, 200, res);

});

// @desc Login Student
// @route POST /api/v1/auth/login
// @access PUBLIC
exports.login = asyncHandler(async (req, res, next) => {
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

  sendTokenResponse(user, 200, res);
    
});

// @desc Get logged in User
// @route GET /api/v1/auth/me
// @access PRIVATE
exports.getLoggedInUser = asyncHandler( async(req, res, next) => {
  const user = req.adult 
    ? await Adult.findById(req.adult.id) 
    : await Student.findById(req.student.id);
  
  res.status(200).json({
    success: true,
    data: user,
  })
});

// @desc Adult Forgot Password
// @route POST /api/v1/auth/adult/forgotpassword
// @access PUBLIC
exports.adultForgotPassword = asyncHandler( async(req, res, next) => {
  const user = await Adult.findOne({ email: req.body.email }) 
  
  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: true });
  
  const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `
  You are receiving this email because you (or someone else) has requested a password reset.
  Please click this link: ${resetUrl} and follow the directions to reset your password.
  `;

  const options = {
    email: user.email,
    subject: 'Password Reset',
    message,
  }

  try {
    await sendEmail(options);
    res.status(200).json({  success: true, data: 'Email sent' })
  } catch (error) {
    console.log(err)
    // return next(new ErrorResponse('Did not work', 404));

    user.getResetPasswordToken = undefined;
    user.getResetPasswordExpired = undefined;

    await user.save({ validateBeforeSave: false });
  }
});

// @desc Forgot Question
// @route PUT /api/v1/auth/forgotquestion
// @access PUBLIC
exports.forgotQuestion = asyncHandler( async(req, res, next) => {

  const user = 
  await Adult.findOne({ email: req.body.email })
  ? await Adult.findOne({ email: req.body.email })
  : await Student.findOne({ email: req.body.username });
  
  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 401))
  };

  res.status(200).json({
    success: true,
    data: user.forgotPasswordQuestion,
  })
})

// @desc Forgot Password
// @route POST /api/v1/auth/forgotpassword
// @access PUBLIC
exports.forgotPassword = asyncHandler(async(req, res, next) => {
  const user = 
  await Adult.findOne({ email: req.body.email }).select('+forgotPasswordAnswer')
  ? await Adult.findOne({ email: req.body.email }).select('+forgotPasswordAnswer')
  : await Student.findOne({ username: req.body.username }).select('+forgotPasswordAnswer')
  
  if (!user) {
    return next(new ErrorResponse('There is no user with that email or username', 404))
  }
  console.log(user);
  // compare forgotten Password Answer with user Forgotten Answer in account
  const isMatch = await user.matchForgotAnswer(req.body.forgotPasswordAnswer);
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    data: resetToken
  })
});

// @desc POST Reset Password
// @route GET /api/v1/auth/resetpassword/:resettoken
// @access PUBLIC
exports.resetPassword = asyncHandler( async(req, res, next) => {

  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await Adult.findOne({ resetPasswordToken, resetPasswordExpired: { $gt: Date.now() }}) 
  ? await Adult.findOne({ resetPasswordToken, resetPasswordExpired: { $gt: Date.now() }}) 
  : await Student.findOne({ resetPasswordToken, resetPasswordExpired: { $gt: Date.now() }});

  
  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpired = undefined;
  user.save();

  sendTokenResponse(user, 200, res);
});



const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwt();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token });
}
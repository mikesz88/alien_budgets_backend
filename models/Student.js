const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'Please add a name']
  },
  lastInitial: {
    type: String,
    maxLength: 1,
    required: [true, 'Please add a last Initial']
  },
  username: {
    type: String,
    required: [true, 'Please add a username'],
    unique: true,
    minlength: 8,
  },
  classroomCode: {
    type: String,
    minLength: 6,
    maxLength: 6,
    required: [true, 'Please add a classroom code'],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 8,
    select: false
  },
  forgotPasswordQuestion: {
    type: String,
    required: [true, 'Please add a forgot password question'],
  },
  forgotPasswordAnswer: {
    type: String,
    required: [true, 'Please add an answer to the forgot password question'],
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpired: Date,
  createAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Student', StudentSchema);

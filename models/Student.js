const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
  avatarURL: {
    type: String,
    required: [true, 'Please add a link to the image'],
    match: [
      /^(https:\/\/alienbudgets\.s3\.amazonaws\.com\/).+(\.png)$/gm,
      'Please add a valid s3 url'
    ]
  },
  avatarColor: {
    type: String,
    required: [true, 'Please add a background color to your avatar'],
    match: [
      /^(#)([A-Za-z0-9]{6}$)/gm,
      'Please write a proper HEX code'
    ]
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

StudentSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})


module.exports = mongoose.model('Student', StudentSchema);

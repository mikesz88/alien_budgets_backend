const mongoose = require('mongoose');

const AdultSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'Please add a name']
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Please add a last name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 8,
    select: false
  },
  gradeLevel: {
    type: Array,
    validate: {
      validator: function(v) {
        return v.length > 0 && v.every(val => typeof val === "string");
      },
      message: () => `Must be a String and you need at least one grade level.`
    },
    required: [true, `You must have one grade picked.`]
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


module.exports = mongoose.model('Adult', AdultSchema);

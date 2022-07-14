const Student = require('../models/Student');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc Get all students
// @route GET /api/v1/students
// @access PRIVATE
exports.getStudents = asyncHandler(async (req, res, next) => {
  let query;
  const reqQuery = { ...req.query };
  const removeFields = ['select', 'sort'];
  removeFields.forEach(param => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  query = Student.find(JSON.parse(queryStr));

  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query.sort('-createdAt');
  }

  const students = await query;

  res.status(200).json({ 
    success: true, 
    count: students.length, 
    data: students 
  });
});

// @desc Get single student
// @route GET /api/v1/students/:id
// @access PRIVATE
exports.getStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    return next(new ErrorResponse(`Student not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: student });
});

// @desc Create new student
// @route POST /api/v1/students
// @access PUBLIC
exports.createStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.create(req.body);
  res.status(201).json({success: true, data: student});
});

// @desc Update student
// @route PUT /api/v1/students/:id
// @access PRIVATE
exports.updateStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!student) {
    return next(new ErrorResponse(`Student not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: student });
});

// @desc Delete student
// @route DELETE /api/v1/students/:id
// @access PRIVATE
exports.deleteStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.findByIdAndDelete(req.params.id);

  if (!student) {
    return next(new ErrorResponse(`Student not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: {} });
});
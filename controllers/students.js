const Student = require('../models/Student');

// @desc Get all students
// @route GET /api/v1/students
// @access PRIVATE
exports.getStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).json({ success: true, count: students.length, data: students })
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc Get single student
// @route GET /api/v1/students/:id
// @access PRIVATE
exports.getStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: student })
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc Create new student
// @route POST /api/v1/students
// @access PUBLIC
exports.createStudent = async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({success: true, data: student})
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc Update student
// @route PUT /api/v1/students/:id
// @access PRIVATE
exports.updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!student) {
      res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: student })  
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc Delete student
// @route DELETE /api/v1/students/:id
// @access PRIVATE
exports.deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: {} })  
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
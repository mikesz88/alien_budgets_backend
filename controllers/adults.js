// @desc Get all users
// @route GET /api/v1/users
// @access PRIVATE
exports.getAdults = (req, res, next) => {
  res.status(200).json({success: true, msg: 'Get all Adults'})
};

// @desc Get single user
// @route GET /api/v1/users/:id
// @access PRIVATE
exports.getAdult = (req, res, next) => {
  res.status(200).json({success: true, msg: `Get single Adult by ID: ${req.params.id}` });
};

// @desc Create new user
// @route POST /api/v1/users
// @access PRIVATE
exports.createAdult = (req, res, next) => {
  res.status(200).json({success: true, msg: 'Create new Adult'})
};

// @desc Update user
// @route PUT /api/v1/users/:id
// @access PRIVATE
exports.updateAdult = (req, res, next) => {
  res.status(200).json({success: true, msg: `Update Adult by ID: ${req.params.id}` })
};

// @desc Delete user
// @route DELETE /api/v1/users/:id
// @access PRIVATE
exports.deleteAdult = (req, res, next) => {
  res.status(200).json({success: true, msg: `Delete Adult by ID: ${req.params.id}` })
};
// @desc Get all users
// @route GET /api/v1/users
// @access PRIVATE
exports.getUsers = (req, res, next) => {
  res.status(200).json({success: true, msg: 'Get all Users'})
};

// @desc Get single user
// @route GET /api/v1/users/:id
// @access PRIVATE
exports.getUser = (req, res, next) => {
  res.status(200).json({success: true, msg: `Get single user by ID: ${req.params.id}` });
};

// @desc Create new user
// @route POST /api/v1/users
// @access PRIVATE
exports.createUser = (req, res, next) => {
  res.status(200).json({success: true, msg: 'Create new user'})
};

// @desc Update user
// @route PUT /api/v1/users/:id
// @access PRIVATE
exports.updateUser = (req, res, next) => {
  res.status(200).json({success: true, msg: `Update user by ID: ${req.params.id}` })
};

// @desc Delete user
// @route DELETE /api/v1/users/:id
// @access PRIVATE
exports.deleteUser = (req, res, next) => {
  res.status(200).json({success: true, msg: `Delete user by ID: ${req.params.id}` })
};
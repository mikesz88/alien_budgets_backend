const Avatar = require('../models/Avatar');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc Get all avatars
// @route GET /api/v1/avatars
// @access PUBLIC
exports.getAvatars = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.filteredResults);
})
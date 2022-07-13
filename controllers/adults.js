const Adult = require('../models/Adult');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc Get all Adults
// @route GET /api/v1/adults
// @access PRIVATE
exports.getAdults = asyncHandler(async (req, res, next) => {
  const adults = await Adult.find();
  res.status(200).json({ 
    success: true, 
    count: adults.length, 
    data: adults 
  });
});

// @desc Get single Adult
// @route GET /api/v1/adults/:id
// @access PRIVATE
exports.getAdult = asyncHandler(async (req, res, next) => {
  const adult = await Adult.findById(req.params.id);

  if (!adult) {
    return next(new ErrorResponse(`Adult not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: adult });
});

// @desc Create new Adult
// @route POST /api/v1/adults
// @access PUBLIC
exports.createAdult = asyncHandler(async (req, res, next) => {
  const adult = await Adult.create(req.body);
  res.status(201).json({success: true, data: adult});
});

// @desc Update Adult
// @route PUT /api/v1/adults/:id
// @access PRIVATE
exports.updateAdult = asyncHandler(async (req, res, next) => {
  const adult = await Adult.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!adult) {
    return next(new ErrorResponse(`Adult not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: adult });
});

// @desc Delete Adult
// @route DELETE /api/v1/adults/:id
// @access PRIVATE
exports.deleteAdult = asyncHandler(async (req, res, next) => {
  const adult = await Adult.findByIdAndDelete(req.params.id);

  if (!adult) {
    return next(new ErrorResponse(`Adult not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: {} });
});
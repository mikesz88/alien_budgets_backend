const Adult = require('../models/Adult');
const ErrorResponse = require('../utils/errorResponse');

// @desc Get all Adults
// @route GET /api/v1/adults
// @access PRIVATE
exports.getAdults = async (req, res, next) => {
  try {
    const adults = await Adult.find();
    res.status(200).json({ success: true, count: adults.length, data: adults })
  } catch (error) {
    next(error);
  }
};

// @desc Get single Adult
// @route GET /api/v1/adults/:id
// @access PRIVATE
exports.getAdult = async (req, res, next) => {
  try {
    const adult = await Adult.findById(req.params.id);

    if (!adult) {
      return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: adult })
  } catch (error) {
    next(error);
  }
};

// @desc Create new Adult
// @route POST /api/v1/adults
// @access PUBLIC
exports.createAdult = async (req, res, next) => {
  try {
    const adult = await Adult.create(req.body);
    res.status(201).json({success: true, data: adult})
  } catch (error) {
    next(error);
  }
};

// @desc Update Adult
// @route PUT /api/v1/adults/:id
// @access PRIVATE
exports.updateAdult = async (req, res, next) => {
  try {
    const adult = await Adult.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!adult) {
      res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: adult })  
  } catch (error) {
    next(error);
  }
};

// @desc Delete Adult
// @route DELETE /api/v1/adults/:id
// @access PRIVATE
exports.deleteAdult = async (req, res, next) => {
  try {
    const adult = await Adult.findByIdAndDelete(req.params.id);

    if (!adult) {
      res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: {} })  
  } catch (error) {
    next(error);
  }
};
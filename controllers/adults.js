const Adult = require('../models/Adult');

// @desc Get all users
// @route GET /api/v1/users
// @access PRIVATE
exports.getAdults = async (req, res, next) => {
  try {
    const adults = await Adult.find();
    res.status(200).json({ success: true, count: adults.length, data: adults })
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc Get single user
// @route GET /api/v1/users/:id
// @access PRIVATE
exports.getAdult = async (req, res, next) => {
  try {
    const adult = await Adult.findById(req.params.id);

    if (!adult) {
      res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: adult })
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc Create new user
// @route POST /api/v1/users
// @access PRIVATE
exports.createAdult = async (req, res, next) => {
  try {
    const adult = await Adult.create(req.body);
    res.status(201).json({success: true, data: adult})
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc Update user
// @route PUT /api/v1/users/:id
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
    res.status(400).json({ success: false });
  }
};

// @desc Delete user
// @route DELETE /api/v1/users/:id
// @access PRIVATE
exports.deleteAdult = async (req, res, next) => {
  try {
    const adult = await Adult.findByIdAndDelete(req.params.id);

    if (!adult) {
      res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: {} })  
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
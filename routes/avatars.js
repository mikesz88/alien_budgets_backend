const express = require('express');
const router = express.Router();
const filteredResults = require('../middleware/filteredResults');
const Avatar = require('../models/Avatar');

const { getAvatars } = require('../controllers/avatars');

router.route('/')
  .get(filteredResults(Avatar), getAvatars);

  module.exports = router;
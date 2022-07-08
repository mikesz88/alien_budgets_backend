const express = require('express');
const router = express.Router();

const {
  getAdults,
  getAdult,
  createAdult,
  updateAdult,
  deleteAdult
} = require('../controllers/adults');

router.route('/')
  .get(getAdults)
  .post(createAdult);

router.route('/:id')
  .get(getAdult)
  .put(updateAdult)
  .delete(deleteAdult);

module.exports = router;
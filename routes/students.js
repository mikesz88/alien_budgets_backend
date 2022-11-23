const express = require('express');
const router = express.Router();

const {
  getStudent,
  addGameById,
  deleteGame,
  addScoreToUser,
  addResultsToStudentsHistory,
} = require('../controllers/students');

const { protect, authorizedAdult } = require('../middleware/auth');

router.route('/:id').get(protect, authorizedAdult, getStudent);
router.put('/game/:gameid', protect, addGameById);
router.delete('/game', protect, deleteGame);
router.put('/score', protect, addScoreToUser);
router.put('/addgameresults', protect, addResultsToStudentsHistory);

module.exports = router;

const router = require('express').Router();

const Answer = require('../controllers/answer');

// GET /answers/:id
router.get('/:id', Answer.getAnswerById);

module.exports = router;

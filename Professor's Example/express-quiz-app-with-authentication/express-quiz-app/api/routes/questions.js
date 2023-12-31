const router = require('express').Router();

const Question = require('../controllers/question');

// GET /questions
router.get('/', Question.getQuestion);

// POST /questions
router.post('/', Question.createQuestion);

// GET /questions/:id
router.get('/:id', Question.getQuestionById);

// DELETE /:id
router.delete('/:id', Question.removeQuestion);

module.exports = router;

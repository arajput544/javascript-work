const router = require('express').Router();

const Question = require('../controllers/question');

// GET /questions
router.get('/', Question.getQuestion);

// GET /questions/types
router.get('/types', Question.getQuestionTypes);

// GET /questions/:id
router.get('/:id', Question.getQuestionById);

module.exports = router;

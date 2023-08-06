const router = require('express').Router();

const Question = require('../controllers/question');

// GET /questions
router.get('/', Question.getQuestion);

// GET /questions/:id
router.get('/:id', Question.getQuestionById);

// POST /question/:id/answers
router.post('/:id/questions', Question.addAnswerToQuestion);

// DELETE /question/:id/answers/:answerId
router.delete('/:id/questions/:answerId', Question.removeAnswerFromQuestion);

module.exports = router;

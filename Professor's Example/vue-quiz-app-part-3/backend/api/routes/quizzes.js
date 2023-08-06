const router = require('express').Router();

const Quiz = require('../controllers/quiz');

const { timestamp } = require('../middleware');

router.use(timestamp.addTimestamp);

// GET /quizzes
router.get('/', Quiz.getQuiz);

// POST /quizzes
router.post('/', Quiz.createQuiz);

// GET /quizzes/:id
router.get('/:id', Quiz.getQuizById);

// PUT /quizzes/:id
router.put('/:id', Quiz.updateQuiz);

// DELETE /quizzes/:id
router.delete('/:id', Quiz.removeQuiz);

// POST /quizzes/:id/questions
router.post('/:id/questions', Quiz.addQuizQuestion);

// PUT /quizzes/:id/questions
router.put('/:id/questions/:questionId', Quiz.updateQuizQuestion);

// DELETE /quizzes/:id/questions
router.delete('/:id/questions/:questionId', Quiz.removeQuizQuestion);

module.exports = router;

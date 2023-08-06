const router = require('express').Router();

// requiring in the respective controller
const Quiz = require('../controllers/quiz');

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

// DELETE /quizzes/:id/questions/:id
router.delete('/:id/projects/:questionId', Quiz.removeQuizQuestion);

module.exports = router;

const QuestionService = require('../services/question');

const getQuestion = async (req, res) => {
    try {
        const questions = await QuestionService.getAllQuestions();
        res.json(questions);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getQuestionById = async (req, res) => {
    const { params } = req;
    const id = params.id;

    try {
        const question = await QuestionService.getQuestyionById(id);
        res.json(question);
    } catch (error) {
        res.status(500).json(error);
    }
};

const addAnswerToQuestion = async (req, res) => {
    const {
        params: { id },
        body,
    } = req;

    try {
        const quiz = await QuestionService.addAnswerToQuestion(id, body);
        res.json(quiz);
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};

const removeAnswerFromQuestion = async (req, res) => {
    const { params } = req;
    const { id, answerId } = params;

    try {
        const quiz = await QuestionService.removeAnswerFromQuestion(
            id,
            answerId
        );
        res.json(quiz);
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};

module.exports = {
    getQuestion,
    getQuestionById,

    addAnswerToQuestion,
    removeAnswerFromQuestion,
};

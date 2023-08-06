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

const getQuestionTypes = async (req, res) => {
    try {
        const types = await QuestionService.getQuestionTypes();
        res.json(types);
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};

module.exports = {
    getQuestion,
    getQuestionById,
    getQuestionTypes
};

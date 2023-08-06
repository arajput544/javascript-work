const Question = require('../models/question');

const AnswerService = require('../services/answer');
const SharedService = require('../services/shared');

const getAllQuestions = async () => await SharedService.all(Question);

const getQuestyionById = async (id) => await SharedService.get(Question, id);

const createQuestion = async (body) =>
    await SharedService.create(Question, body);

const removeQuestion = async (id) => await SharedService.remove(Question, id);

// add an answer and its relationship to question
const addAnswerToQuestion = async (id, body) => {
    const answer = await AnswerService.createAnswer(body);
    const updated = await Question.findByIdAndUpdate(
        id,
        {
            $set: { answer: answer._id },
        },
        { returnDocument: 'after' }
    );
    return updated;
};

// remove an answer and the relationship to question
const removeAnswerFromQuestion = async (id, answerId) => {
    await AnswerService.removeAnswer(answerId);

    const updated = await Question.findByIdAndUpdate(
        id,
        {
            $unset: { answer: '' },
        },
        { returnDocument: 'after' }
    );

    return updated;
};

module.exports = {
    getAllQuestions,
    getQuestyionById,
    createQuestion,
    removeQuestion,
    addAnswerToQuestion,
    removeAnswerFromQuestion,
};

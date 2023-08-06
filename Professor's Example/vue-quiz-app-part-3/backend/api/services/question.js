const Question = require('../models/question');

const SharedService = require('./shared');

const getAllQuestions = async () => await SharedService.all(Question);

const getQuestyionById = async (id) => await SharedService.get(Question, id);

const getQuestionTypes = () => Question.schema.path('type').enumValues;

// shared functions
const createQuestion = async (body) =>
    await SharedService.create(Question, body);

const updateQuestionById = async (id, body) =>
    await SharedService.update(Question, id, body);

const removeQuestionById = async (id) =>
    await SharedService.remove(Question, id);

module.exports = {
    getAllQuestions,
    getQuestyionById,
    getQuestionTypes,
    createQuestion,
    updateQuestionById,
    removeQuestionById
};

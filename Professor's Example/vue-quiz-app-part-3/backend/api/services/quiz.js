const Quiz = require('../models/quiz');

const QuestionService = require('./question');
const SharedService = require('./shared');

// shared method for checking time
const _canUpdateQuiz = async (id) => {
    const now = new Date().toISOString();
    const validQuiz = await Quiz.findOne({ _id: id, start: { $gte: now } });
    return Boolean(validQuiz);
};

const getAllQuizzes = async (query) => {
    if (query.name) {
        return await Quiz.find({
            name: { $regex: query.name, $options: 'i' }
        });
    }

    return await SharedService.all(Quiz);
};

const createQuiz = async (body) => await SharedService.create(Quiz, body);

const getQuizById = async (id) => {
    return await Quiz.findById(id).populate('questions');
};

const updateQuiz = async (id, body) => {
    const canUpdate = await _canUpdateQuiz(id);

    if (canUpdate) {
        return await Quiz.findByIdAndUpdate(id, body, {
            returnDocument: 'after'
        });
    } else {
        throw new Error(`Cannot update Quiz ${id}.`);
    }
};

const removeQuiz = async (id) => {
    const canUpdate = await _canUpdateQuiz(id);

    if (canUpdate) {
        return await Quiz.findByIdAndDelete(id);
    } else {
        throw new Error(`Cannot update Quiz ${id}.`);
    }
};

// add a question and associate to the quiz
const addQuizQuestion = async (id, body) => {
    const canUpdate = await _canUpdateQuiz(id);

    if (canUpdate) {
        const question = await QuestionService.createQuestion(body);
        return await Quiz.findByIdAndUpdate(
            id,
            {
                $set: { last_updated: body.last_updated },
                $addToSet: { questions: question._id }
            },
            { returnDocument: 'after' }
        );
    } else {
        throw new Error(`Cannot update Quiz ${id}.`);
    }
};

// add a question and associate to the quiz
const updateQuizQuestion = async (id, questionId, body) => {
    const canUpdate = await _canUpdateQuiz(id);

    if (canUpdate) {
        await QuestionService.updateQuestionById(questionId, body);
        return await Quiz.findById(id).populate('questions');
    } else {
        throw new Error(`Cannot update Quiz ${id}.`);
    }
};

// remove a question and dis-associate to the quiz
const removeQuizQuestion = async (id, questionId) => {
    const canUpdate = await _canUpdateQuiz(id);

    if (canUpdate) {
        await QuestionService.removeQuestionById(questionId);

        return await Quiz.findByIdAndUpdate(
            id,
            {
                $pull: { questions: questionId }
            },
            { returnDocument: 'after' }
        );
    } else {
        throw new Error(`Cannot update Quiz ${id}.`);
    }
};

module.exports = {
    getAllQuizzes,
    getQuizById,
    createQuiz,
    updateQuiz,
    removeQuiz,

    addQuizQuestion,
    updateQuizQuestion,
    removeQuizQuestion
};

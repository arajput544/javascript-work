// only interacts with its respective model
const Quiz = require('../models/quiz');

const SharedService = require('../services/shared');
const QuestionService = require('../services/question');

const _canUpdateQuiz = async (id) => {
    const now = new Date().toISOString();
    const validQuiz = await Quiz.findOne({ _id: id, start: { $gt: now } });
    return Boolean(validQuiz);
};

const getAllQuizzes = async () => await SharedService.all(Quiz);

const getQuizByName = async (searchTerm) => {
    const matches = await Quiz.find({
        name: { $regex: searchTerm, $options: 'i' },
    });
    return matches;
};

const createQuiz = async (body) => await SharedService.create(Quiz, body);

const getQuizById = async (id) => await SharedService.get(Quiz, id);

const updateQuiz = async (id, body) => {
    const canUpdate = await _canUpdateQuiz(id);

    if (canUpdate) {
        const updated = await SharedService.update(Quiz, id, body);
        return updated;
    } else {
        throw new Error(`Cannot update Quiz ${id}.`);
    }
};

const removeQuiz = async (id) => {
    const canUpdate = await _canUpdateQuiz(id);

    if (canUpdate) {
        const removed = await SharedService.remove(Quiz, id);
        return { deleted: removed };
    } else {
        throw new Error(`Cannot delete Quiz ${id}.`);
    }
};

// add a question and associate it to the specfied quiz
const addQuizQuestion = async (id, body) => {
    const canUpdate = await _canUpdateQuiz(id);

    if (canUpdate) {
        const question = await QuestionService.createQuestion(body);
        const updated = await Quiz.findByIdAndUpdate(
            id,
            {
                $push: { questions: question._id },
            },
            { returnDocument: 'after' }
        );
        return { updated, question };
    } else {
        throw new Error(`Cannot add question to Quiz ${id}.`);
    }
};

// remove a question and dis-associate it to the specfied quiz
const removeQuizQuestion = async (id, questionId) => {
    const canUpdate = await _canUpdateQuiz(id);

    if (canUpdate) {
        await QuestionService.removeQuestion(questionId);
        const updated = await Quiz.findByIdAndUpdate(
            id,
            {
                $pull: { questions: questionId },
            },
            { returnDocument: 'after' }
        );

        return updated;
    } else {
        throw new Error(`Cannot remove question from Quiz ${id}.`);
    }
};

module.exports = {
    getAllQuizzes,
    getQuizByName,
    createQuiz,
    getQuizById,
    updateQuiz,
    removeQuiz,
    addQuizQuestion,
    removeQuizQuestion,
};

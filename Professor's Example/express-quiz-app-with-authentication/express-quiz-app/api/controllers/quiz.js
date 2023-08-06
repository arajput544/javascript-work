// when we talk about MVC pattern, the job of the controller is to take care of the Business Logic. However, when we actually implement it, the controller may end up with some validation routine calls, setting model attributes and view (not required in Rest controller) etc.
// The design pattern to have Service layer to separate all this logic from presentation layer.
// we import services into services due to re-usability and

// Technically there is nothing that prevents you from calling multiple services from your controller, but it is probably a bad design decision, mainly due to the Single Responsibility Principle. Roughly this dictates that classes should have a single responsibility and reason to change, controllers are the interface of your application and should focus on being only that. Any file that needs to import multiple services probably contain some business logic and that code is probably better placed in separate  layer classes than the controller.

// most of models contains a lot of data. This can be multiple Entities from database, data from configuration etc. In this case Controller use lower level tier: Service, Repository. They all help the Сontroller to build model for View.

const QuizService = require('../services/quiz');

const getQuiz = async (req, res) => {
    const { query } = req;
    const name = query.name;

    try {
        if (name) {
            const matches = await QuizService.getQuizByName(name);
            res.json(matches);
        } else {
            const quizzes = await QuizService.getAllQuizzes();
            res.json(quizzes);
        }
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};

const createQuiz = async (req, res) => {
    const { body } = req;

    try {
        const quiz = await QuizService.createQuiz(body);
        res.json(quiz);
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};

const getQuizById = async (req, res) => {
    const { params } = req;
    const id = params.id;

    try {
        const quiz = await QuizService.getQuizById(id);
        res.json(quiz);
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};

const updateQuiz = async (req, res) => {
    const {
        body,
        params: { id }
    } = req;

    try {
        const quiz = await QuizService.updateQuiz(id, body);
        res.json(quiz);
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};

const removeQuiz = async (req, res) => {
    const {
        params: { id }
    } = req;

    try {
        const quiz = await QuizService.removeQuiz(id);
        res.json(quiz);
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};

const addQuizQuestion = async (req, res) => {
    const {
        params: { id },
        body
    } = req;

    try {
        const quiz = await QuizService.addQuizQuestion(id, body);
        res.json(quiz);
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};

const removeQuizQuestion = async (req, res) => {
    const {
        params: { id, questionId }
    } = req;

    try {
        const quiz = await QuizService.removeQuizQuestion(id, questionId);
        res.json(quiz);
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};

module.exports = {
    getQuiz,
    getQuizById,
    createQuiz,
    updateQuiz,
    removeQuiz,

    addQuizQuestion,
    removeQuizQuestion
};

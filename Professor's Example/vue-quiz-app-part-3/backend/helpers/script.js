    /* eslint-disable camelcase */
// first: install dependencies with: npm install
// second: run this demo script with: npx nodemon script.js
const mongoose = require('mongoose');

const Question = require('../api/models/question');
const Quiz = require('../api/models/quiz');

const { username, password, dbName } = require('../config.json');
const mongoURL = `mongodb+srv://${username}:${password}@cluster0.epdxv4e.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
    .connect(mongoURL)
    .then(() => console.log('Connected to Mongo'))
    .catch(() => console.log('Failed to Connect'));

const execScript = async () => {
    await Quiz.deleteMany({});

    const quiz_one = await Quiz.create({
        name: 'Intermediate JavaScript Quiz',
        instructions:
            'Please select the best answer for the Intermediate JavaScript Quiz',
        start: '2022-12-21',
        end: '2022-12-31',
        timer: {
            is_timed: true,
            time_limit: 10
        }
    });

    const quiz_two = await Quiz.create({
        name: 'Intro Python Quiz',
        instructions: 'Please select the best answer for the Python Quiz.',
        start: '2023-01-01',
        end: '2023-01-10',
        timer: {
            isTimed: false,
            time_limit: null
        }
    });

    await Question.deleteMany({});

    const question_one = await Question.create({
        text: 'The HTTP Verb that should be used for updating a specific data entry by using an id in the URL and sending the data details in the body.',
        points: 10,
        type: 'multiple choice',
        answers: [
            { choice: 'GET', correct: false },
            { choice: 'POST', correct: false },
            { choice: 'PUT', correct: true },
            { choice: 'DELETE', correct: false }
        ]
    });

    const question_two = await Question.create({
        text: 'REST only supports a JSON message format. REST APIs cannot return other message formats like XML.',
        points: 10,
        type: 'true/false',
        answers: [
            { choice: true, correct: false },
            { choice: false, correct: true }
        ]
    });

    const question_three = await Question.create({
        text: 'String literals in Python can be declared using double quotes or single quotes?',
        points: 10,
        type: 'true/false',
        answers: [
            { choice: true, correct: false },
            { choice: false, correct: true }
        ]
    });

    const question_four = await Question.create({
        text: 'Indentation in Python is...?',
        points: 10,
        type: 'multiple choice',
        answers: [
            { choice: 'optional', correct: false },
            { choice: 'mandatory', correct: true },
            { choice: 'user preference', correct: false }
        ]
    });

    await Quiz.updateOne(
        { _id: quiz_one._id },
        { questions: [question_one._id, question_two._id] }
    );

    await Quiz.updateOne(
        { _id: quiz_two._id },
        { questions: [question_three._id, question_four._id] }
    );

    const fullQuiz1 = await Quiz.findById(quiz_one._id).populate('questions');
    const fullQuiz2 = await Quiz.findById(quiz_two._id).populate('questions');

    console.log(JSON.stringify(fullQuiz1, null, 2));
    console.log(JSON.stringify(fullQuiz2, null, 2));

    mongoose.connection.close();
};
execScript();

// first: install dependencies with: npm install
// second: run this demo script with: npx nodemon script.js
const mongoose = require('mongoose');

const Answer = require('./models/answer');
const Question = require('./models/question');
const Quiz = require('./models/quiz');

const { username, password, dbName } = require('./config.json');
const mongoURL = `mongodb+srv://${username}:${password}@cluster0.epdxv4e.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongoURL, () => {
    console.log('Connected to Mongo');
});

const execScript = async () => {
    // for demo purposes clear collection on save because running the script with nodemon
    await Quiz.deleteMany({});

    // create a quiz using our mock data
    const quiz = await Quiz.create({
        name: 'Intermediate JS Quiz',
        instructions: 'Please select the best answer.',
        start: '2022-09-01',
        end: '2022-09-04',
        timer: {
            is_timed: true,
            time_limit: 10,
        },
    });

    // for demo purposes clear collection on save because running the script with nodemon
    await Question.deleteMany({});

    // create a question using our mock data
    const question = await Question.create({
        text: 'REST only supports a JSON message format.  REST APIs cannot return other message formats like XML.',
        points: 10,
        type: 'true/false',
    });

    // update the quiz with the newly created question
    // use the $push operator to add the question _id to the questions array
    await Quiz.updateOne(
        { _id: quiz._id },
        { $push: { questions: question._id } }
    );

    // const updatedQuiz = await Quiz.findById(quiz._id);

    // for demo purposes clear collection on save because running the script with nodemon
    await Answer.deleteMany({});

    // create an answer using our mock data
    const answer = await Answer.create({
        choices: [
            { answer: true, is_correct: false },
            { answer: false, is_correct: true },
        ],
    });

    // update the question with the newly created question
    // use the $set operator to set the answer field to the answer _id
    await Question.updateOne(
        { _id: question._id },
        { $set: { answer: answer._id } }
    );

    // const updatedQuestion = await Question.findById(question._id);

    // populate a quiz with questions (populate)
    const quizWithQuestions = await Quiz.findById(quiz._id).populate(
        'questions'
    );
    // console.log(quizWithQuestions);

    // populate a question with quiz information (virtual popualte)
    const questionWithQuiz = await Question.findById(question._id).populate(
        'quiz'
    );
    // console.log(questionWithQuiz);

    // populate nested - first populate the questions then populate the answers
    const fullQuiz = await Quiz.findById(quiz._id).populate({
        path: 'questions',
        model: 'Question',
        populate: {
            path: 'answer',
            model: 'Answer',
        },
    });

    console.log(JSON.stringify(fullQuiz, null, 2));
};
execScript();

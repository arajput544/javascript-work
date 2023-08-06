const mongoose = require('mongoose');

const Schema = mongoose.Schema;
console.log(Schema);
const AnswerSchema = new Schema({
    choices: [
        {
            answer: mongoose.Mixed,
            is_correct: Boolean,
        },
    ],
});

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;

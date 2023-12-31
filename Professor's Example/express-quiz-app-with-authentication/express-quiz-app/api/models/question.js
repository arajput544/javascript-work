const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema(
    {
        text: String,
        points: {
            type: Number,
            min: 0,
            max: 100
        },
        type: {
            type: String,
            enum: ['true/false', 'fill in the blank', 'multiple choice']
        },
        choices: [
            {
                answer: mongoose.Mixed,
                is_correct: Boolean
            }
        ]
    },
    {
        // ensure `res.json()` include virtuals
        toJSON: { virtuals: true },
        // ensure `console.log()` include virtuals
        toObject: { virtuals: true }
    }
);

QuestionSchema.virtual('quiz', {
    ref: 'Quiz',
    localField: '_id',
    foreignField: 'questions'
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;

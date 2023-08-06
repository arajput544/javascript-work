<template>
    <form>
        <div class="form-container">
            <div>
                <label>Question</label>
                <textarea type="text" v-model="question.text"></textarea>
            </div>
            <div>
                <label>Points</label>
                <input v-model="question.points" name="points" />
            </div>
            <div>
                <label>Question Type</label>
                <select v-model="selected_type" @change="changeAnswerType()">
                    <option v-for="qtype in question_types">
                        {{ qtype }}
                    </option>
                </select>
            </div>
            <div>
                <div class="answer-choice">
                    <label>Answer Choices</label>
                    <div v-for="(answer, idx) in question.answers">
                        <input type="radio" v-model="selected_answer" :value="idx" :checked="(selected_answer === idx)"
                            @click="changeAnswer(idx)" />

                        <input type="text" v-model="answer.choice" name="text" />
                    </div>
                </div>
                <input type="button" v-if="question._id" @click="updateQuestion" value="Update Question" />
                <input type="button" v-if="question._id" @click="deleteQuestion" value="Delete Question" />
                <input type="button" v-else @click="addQuestion" value="Add Question" />

                <div v-show="(error || success)">
                    <p class="error" v-if="error">Question failed to saved.</p>
                    <p class="success" v-if="success">Question successfully saved.</p>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
    name: 'QuestionForm',
    props: {
        question: Object,
        question_types: Array
    },
    data() {
        return {
            route: useRoute(),
            previous_type: this.question.type || '',
            previous_answer_set: this.question.answers ? { [this.question.type]: this.question.answers } : {},
            selected_answer: this.question.answers ? this.question.answers.findIndex(answer => answer.correct) : null,
            selected_type: this.question.type,
            success: null,
            error: null
        }
    },
    methods: {
        handleResponse(res) {
            if (res.ok) {
                this.success = true
            } else {
                this.error = true
            }

            setTimeout(function (scope) {
                scope.success = null
                scope.error = null
            }, 2000, this)
        },
        changeAnswerType() {
            // we could make this more robost creating an endpoint on the server
            // that would provide defaults answer arrays for each answer type

            // keep the users previous answers so they do not lose progress when switching types
            if (!this.previous_answer_set[this.previous_type]) {
                this.previous_answer_set[this.previous_type] = this.question.answers
            }

            // if the selected type was added to the previous answer set then display their previous
            if (this.previous_answer_set[this.selected_type]) {
                this.question.answers = this.previous_answer_set[this.selected_type]

            }

            else if (this.selected_type === 'true/false') {
                this.question.answers = [{
                    choice: true, correct: false
                },
                {
                    choice: false, correct: false
                }]

            }

            else if (this.selected_type === 'multiple choice') {
                this.question.answers = [{
                    choice: '', correct: false
                },
                {
                    choice: '', correct: false
                },
                {
                    choice: '', correct: false
                },
                {
                    choice: '', correct: false
                }]

            }

            else if (this.selected_type === 'fill in the blank') {
                this.question.answers = [{
                    choice: '', correct: true
                }]
            }

            this.previous_type = this.selected_type
        },
        changeAnswer(idx) {
            this.selected_answer = idx
        },
        async addQuestion() {
            const answers = this.question.answers.map((answer, idx) => {
                if (this.selected_answer === idx) {
                    return { ...answer, correct: true }
                } else {
                    return { ...answer, correct: false }
                }
            })

            const data = { ...this.question, type: this.selected_type, answers }

            const res = await fetch(`http://localhost:8888/quizzes/${this.route.params.id}/questions`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            this.$emit('refresh')
        },
        async updateQuestion() {
            const answers = this.question.answers.map((answer, idx) => {
                if (this.selected_answer === idx) {
                    return { ...answer, correct: true }
                } else {
                    return { ...answer, correct: false }
                }
            })

            const data = { ...this.question, type: this.selected_type, answers }

            const res = await fetch(`http://localhost:8888/quizzes/${this.route.params.id}/questions/${this.question._id}`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            this.handleResponse(res)
        },
        async deleteQuestion() {
            const res = await fetch(`http://localhost:8888/quizzes/${this.route.params.id}/questions/${this.question._id}`, {
                method: 'DELETE',
                mode: 'cors'
            })

            this.$emit('refresh')
        }
    }

}
</script>

<style>
.form-container {
    padding: 25px;
}

form {
    margin: 0px auto;
    width: 100%;
    height: auto;
    background: #FFF;
}

form label {
    font-size: 14px;
    color: #888;
    cursor: pointer;
}

form input,
form textarea,
form select {
    margin: 10px 0;
    padding: 10px 10px;
    border: 1px solid #333;
    border-radius: 5px;
    display: block;
}

input[type="button"] {
    background: #2b2d42;
    border: 1px solid #000;
    color: #FFF;
    border-radius: 50px;
    cursor: pointer;
    font-size: 14px;
    display: inline;
    width: 33%;
    margin-right: 10px;
}

input[type="button"]:hover {
    background: #8d99ae;
    color: #111;
}

.answer-choice {
    margin-bottom: 20px;
}

.answer-choice input[type="text"] {
    display: inline-block !important;
    padding: 5px 11px;
    cursor: pointer;
    width: 80%;
}

.answer-choice input[type="radio"],
.answer-choice input[type="radio"]:checked {
    display: inline-block !important;
    accent-color: #679436;
    width: 15%;
}

.error {
    color: #de3e53;
    text-transform: uppercase;
}

.success {
    color: #56de3e;
    text-transform: uppercase;
}
</style>
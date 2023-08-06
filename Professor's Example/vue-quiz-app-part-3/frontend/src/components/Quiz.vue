<template>
    <div class="row">
        <div class="column-left">
            <QuizForm v-bind:quiz="{ ...populated_quiz }" />
        </div>
        <div class="column-right">
            <div class="question-container">
                <div v-for="question in populated_quiz.questions" class="question-block">
                    <QuestionForm v-bind:question="{ ...question }" v-bind:question_types="question_types"
                        @refresh="refresh" />
                </div>

                <button class="btn" v-show="!showQuestionForm" @click="loadAddQuestion()">+ Add Question</button>
                <QuestionForm v-show="showQuestionForm" v-bind:question="add_question"
                    v-bind:question_types="question_types" @refresh="refresh" />
            </div>
        </div>
    </div>
</template>


<script>
import QuizForm from './QuizForm.vue'
import QuestionForm from './QuestionForm.vue'
export default {
    name: 'Quiz',
    components: {
        QuizForm,
        QuestionForm
    },
    data() {
        return {
            showQuestionForm: false,
            add_question: {},
            populated_quiz: {},
            question_types: [],
        }
    },
    methods: {
        loadAddQuestion() {
            this.add_question = { answers: [] }
            this.showQuestionForm = true
        },
        async refresh() {
            const res = await fetch(`http://localhost:8888/quizzes/${this.populated_quiz._id}`)
            const quiz = await res.json()

            this.populated_quiz = quiz
            this.showQuestionForm = false
        },
        setData(quiz, questionTypes) {
            this.populated_quiz = quiz
            this.question_types = questionTypes
        }
    },
    async beforeRouteEnter(to, from, next) {
        const quizRes = await fetch(`http://localhost:8888/quizzes/${to.params.id}`)
        const quiz = await quizRes.json()

        const typeRes = await fetch(`http://localhost:8888/questions/types`)
        const questionTypes = await typeRes.json()

        next(function (vm) {
            return vm.setData(quiz, questionTypes)
        })
    }


}
</script>

<style>
.column-left {
    float: left;
    width: 49%;
    margin-right: 1%;
}

.column-right {
    float: right;
    width: 50%;
}

.question-block {
    margin-bottom: 10px;
}

.question-card {
    background-color: #FFF;
    border: 1px solid #CCC;
}

.question-card .content {
    min-height: 250px;
}

.question-card .points {
    font-size: 15px;
    font-family: 'Open Sans', sans-serif;
    font-weight: bold;
    text-align: right;
    padding: 10px;
    margin: 0px
}

.question-card .text {
    font-size: 15px;
    font-family: 'Open Sans', sans-serif;
    padding: 10px
}

.question-card .text {
    font-size: 15px;
    font-family: 'Open Sans', sans-serif;
    padding: 10px 25px
}
</style>
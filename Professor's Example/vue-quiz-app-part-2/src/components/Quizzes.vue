<template>

    <div class="quiz-list-container">
        <div v-for="quiz in quizzes" class="quiz-block">
            <div class="quiz-card">
                <div class="content">
                    <span class="title">{{ quiz.name }}</span>
                    <p class="text">
                        {{ quiz.instructions }}
                    </p>
                </div>
                <div class="quiz-btn-container">
                    <button class="btn" @click="openQuizModal(quiz)">Edit</button>
                    <button class="btn" @click="deleteQuiz(quiz.id)">Delete</button>
                </div>
            </div>
        </div>
    </div>

    <QuizModal v-bind:quiz="quiz_data" v-show="showModal" @closeModal="closeModal" />
</template>

<script>
import QuizModal from './QuizModal.vue'

export default {
    name: 'Quizzes',
    components: {
        QuizModal
    },
    data() {
        return {
            quizzes: [],
            quiz_data: {},
            showModal: false,
        }
    },
    methods: {
        openQuizModal(quiz) {
            this.showModal = true;
            this.quiz_data = { ...quiz }
        },

        updateQuiz(quiz) {
            console.log(JSON.stringify(quiz))
        },

        deleteQuiz(id) {
            this.quizzes = this.quizzes.filter(function (quiz) {
                return quiz.id !== id
            })
        },

        closeModal() {
            this.showModal = false;
        }
    },
    async created() {
        this.quizzes = [
            {
                "id": 1,
                "name": "Intermediate JavaScript Quiz",
                "instructions": "This quiz focuses on Intermediate JavaScript. Please select the best answer.",
                "start": "2022-12-01",
                "end": "2022-12-04",
                "timer": {
                    "is_timed": true,
                    "time_limit": 10
                }
            },
            {
                "id": 2,
                "name": "Advanced JavaScript Quiz",
                "instructions": "This quiz focuses on Advanced JavaScript concepts. Please select the best answer.",
                "start": "2022-12-10",
                "end": "2022-12-18",
                "timer": {
                    "is_timed": false,
                    "time_limit": null
                }
            },
            {
                "id": 3,
                "name": "Intro Python Quiz",
                "instructions": "This quiz focuses on Introduction Python material. Please select the best answer.",
                "start": "2022-12-10",
                "end": "2022-12-18",
                "timer": {
                    "is_timed": false,
                    "time_limit": null
                }
            }
        ]
    }
}
</script>

<style>
.quiz-list-container {
    display: grid;
    justify-content: center;
    align-content: center;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    gap: 10px;
}

.quiz-block {
    margin: 10px 5px;
}

.quiz-card {
    background-color: #2b2d42
}

.quiz-card .content {
    color: #efefef;
    min-height: 200px;
    padding: 30px;
}

.quiz-card .title {
    font-size: 30px;
    font-family: 'Roboto Condensed', sans-serif;
}

.quiz-card .text {
    font-size: 14px;
    padding-top: 10px;
}

.quiz-card .quiz-btn-container {
    border-top: 1px solid #606060;
    color: #FFF;
}

.btn {
    background: #202020;
    border: 1px solid #000;
    color: #FFF;
    padding: 10px;
    margin: 10px;
    border-radius: 50px;
    cursor: pointer;
    font-size: 14px;
    text-decoration: none;
}

.btn:hover {
    background: #8d99ae;
    color: #111;
}
</style>
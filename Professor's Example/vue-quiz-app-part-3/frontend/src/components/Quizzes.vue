<template>
    <button class="btn" @click="openQuizModal()">+ Add Quiz</button>
    <div class="quiz-list-container">
        <div v-for="quiz in quizzes" class="quiz-block">
            <div class="quiz-card">
                <div class="content">
                    <span class="title">{{ quiz.name }}</span>
                    <p class="text">
                        <span class="heading">Instructions</span>
                        {{ quiz.instructions }}
                    </p>
                    <p class="text">
                        <span class="heading">Start Time</span>
                        {{ quiz.start }}
                    </p>
                </div>
                <div class="quiz-btn-container">
                    <RouterLink :to="`/quizzes/${quiz._id}`" class="btn">Details</RouterLink>
                    <button class="btn" @click="openQuizModal(quiz)"> Edit</button>
                    <button class="btn" @click="deleteQuiz(quiz._id)">Delete</button>
                </div>
            </div>
        </div>
    </div>

    <QuizModal v-bind:quiz="quiz_data" v-show="showModal" @closeModal="closeModal" @refresh="refresh" />
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
            this.quiz_data = quiz ? { ...quiz } : { timer: {} }
        },

        async deleteQuiz(_id) {
            await fetch(`http://localhost:8888/quizzes/${_id}`, {
                method: 'DELETE',
                mode: 'cors'
            })

            this.refresh()
        },

        async refresh() {
            const res = await fetch(`http://localhost:8888/quizzes`)

            const body = await res.json()
            this.quizzes = body
        },

        closeModal() {
            this.showModal = false;
        }
    },
    async created() {
        this.refresh()
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

.quiz-card .heading {
    color: #a7adc5;
    text-transform: uppercase;
    display: block;
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
<template>

    <form>
        <div class="form-container">
            <div>
                <label>Quiz Name</label>
                <input type="text" v-model="quiz.name" name="name" />
            </div>
            <div>
                <label>Instructions</label>
                <textarea v-model="quiz.instructions" name="instructions"></textarea>
            </div>
            <div>
                <label>Start Date</label>
                <input type="text" v-model="quiz.start" name="start" />
            </div>
            <div>
                <label>End Date</label>
                <input type="text" v-model="quiz.end" name="end" />
            </div>
            <div v-if="quiz.timer">
                <label>Timed</label>
                <input type="checkbox" v-model="quiz.timer.is_timed" name="is_timed" />
            </div>
            <div v-if="quiz.timer && quiz.timer.is_timed">
                <label>Time Limit (minutes)</label>
                <input type=" text" v-model="quiz.timer.time_limit" name="time_limit" />
            </div>
            <div>
                <input type="button" v-if="quiz._id" @click="updateQuiz" value="Update Quiz" />
                <input type="button" v-else @click="addQuiz" value="Add Quiz" />
            </div>
            <div v-bind:class="error ? 'error' : 'hidden'">
                <p>Error: failed to save quiz.</p>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    name: 'QuizForm',
    props: {
        quiz: Object
    },
    data() {
        return {
            error: null
        }
    },
    methods: {
        handleError() {
            this.error = true

            setTimeout(function (scope) {
                scope.error = null
            }, 2000, this)
        },
        async addQuiz() {
            const res = await fetch(`http://localhost:8888/quizzes`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.quiz)
            })

            if (res.ok) {
                this.$emit('closeModal')
                this.$emit('refresh')
            } else {
                this.handleError()
            }
        },
        async updateQuiz() {
            const res = await fetch(`http://localhost:8888/quizzes/${this.quiz._id}`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.quiz)
            })

            if (res.ok) {
                this.$emit('closeModal')
                this.$emit('refresh')
            } else {
                this.handleError()
            }
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
form textarea {
    margin: 10px 0;
    padding: 10px 10px;
    width: 95%;
    border: 1px solid #333;
    border-radius: 5px;
    display: block;
}

input[type="checkbox"] {
    height: 25px;
    width: 25px;
    accent-color: #000;
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

.hidden {
    display: none;
}

.error {
    color: #de3e53;
    text-transform: uppercase;
}
</style>
<template>
    <div class="quiz-list">
        <div class="quiz-block">
            <div class="quiz-card">
                <div class="content">
                    <p class="title"></p>
                    <p class="text">
                    </p>
                </div>
                <div class="quiz-btns">
                    <button class="btn">Edit</button>
                    <button class="btn">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const quizzes = [
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
</script>

<style>
.quiz-list {
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
    margin-top: 0px;
}

.quiz-card .text {
    font-size: 14px;
    padding-top: 10px;
}

.quiz-card .quiz-btns {
    border-top: 1px solid #606060;
    color: #FFF;
}

.btn {
    background: #202020;
    border: 1px solid #000;
    color: #FFF;
    padding: 10px 30px;
    margin: 30px 0px 30px 20px;
    border-radius: 50px;
    cursor: pointer;
    font-size: 14px;
}

.btn:hover {
    background: #8d99ae;
    color: #111;
}
</style>



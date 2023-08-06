<template>
    <div class="row">
        <div class="column-left">

        </div>
        <div class="column-right">
            <div class="question-container">
                <div class="question-block">
                    <div class="question-card">
                        <div class="content">
                            <p class="points"></p>
                            <p class="text"></p>
                            <div class="answer-choice">
                                <div>
                                    <input type="radio" />
                                    <label></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
const quiz = {
    "id": 1,
    "name": "Intermediate JavaScript Quiz",
    "instructions": "This quiz focuses on Intermediate JavaScript. Please select the best answer.",
    "start": "2022-12-01",
    "end": "2022-12-04",
    "timer": {
        "is_timed": true,
        "time_limit": 10
    },
    "questions": [{
        "id": 1,
        "text": "REST only supports a JSON message format.  REST APIs cannot return other message formats like XML.",
        "points": 10,
        "type": "true/false",
        "answers": [{ "choice": true, "correct": false }, { "choice": false, "correct": true }]
    },
    {
        "id": 2,
        "text": "The HTTP Verb that should be used for updating a specific data entry by using an id in the URL and sending the data details in the body.",
        "points": 10,
        "type": "multiple choice",
        "answers": [{ "choice": "GET", "correct": false }, { "choice": "POST", "correct": false }, { "choice": "PUT", "correct": true }, { "choice": "DELETE", "correct": false }]
    }]
}
</script>

<style>
.column-left {
    float: left;
    width: 57%;
    margin-right: 3%;
}

.column-right {
    float: right;
    width: 40%;
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

.answer-choice {
    padding: 5px 20px;
    margin-bottom: 20px;
}

.answer-choice label {
    display: inline-block;
    padding: 5px 11px;
    cursor: pointer;
}

.answer-choice input[type="radio"]:checked {
    accent-color: #679436;
}
</style>
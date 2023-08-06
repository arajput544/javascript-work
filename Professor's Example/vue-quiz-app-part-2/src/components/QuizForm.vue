<template>
    <form>
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

        </div>
    </form>
</template>

<script>

</script>

<style>
form {
    margin: 0px auto;
    padding: 10px;
    width: 90%;
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
</style>
<template>
    <div class="container">
        <h1>Quiz App Part 1</h1>

    </div>
</template>

<script>
import Quizzes from './components/Quizzes.vue'

export default {
    name: 'App',
    components: {
        Quizzes
    }
}
</script>

<style>
body {
    font-family: 'Open Sans', sans-serif;
    background: #EFEFEF;
}

h1 {
    text-transform: uppercase;
    margin: 25px 5px;
}

.container {
    margin: 25px auto;
    padding: 0px 25px;
}
</style>

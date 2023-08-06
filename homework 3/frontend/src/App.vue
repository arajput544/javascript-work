<template>
    <div class="con">
        <h1>Task Management App</h1>
        <RouterView />
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
h1 {
    text-transform: uppercase;
    margin: 25px 5px;
}

body {
    
    font-family: Georgia, serif;
    background: #101852;
    color: rgb(102, 51, 51);
}


.con {
    margin: 20px auto;
    padding: 10px 20px;
}
</style>
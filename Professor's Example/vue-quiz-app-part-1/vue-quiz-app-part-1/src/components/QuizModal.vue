<template>
    <div class="modal-bg">
        <div class="modal">
            <form>
                <div>
                    <label>Quiz Name</label>
                    <input type="text" name="name" />
                </div>
                <div>
                    <label>Instructions</label>
                    <textarea name="instructions"></textarea>
                </div>
                <div>
                    <label>Start Date</label>
                    <input type="text" name="start" />
                </div>
                <div>
                    <label>End Date</label>
                    <input type="text" name="end" />
                </div>
                <div>
                    <label>Timed</label>
                    <input type="checkbox" name="is_timed" />
                </div>
                <div>
                    <label>Time Limit (minutes)</label>
                    <input type="text" name="time_limit" />
                </div>

                <div>
                    <input type="submit" value="Update Quiz" />
                    <input type="button" value="Close" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>


</script>

<style>
.modal-bg {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(1px);
}

.modal {
    background-color: #FFF;
    border: 1px solid #000;
    width: 700px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

form {
    margin: 5% auto;
    padding: 10px;
    width: 90%;
    height: auto;
    background: #FFF;
    border-radius: 10px;
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
    width: 100%;
    border: 1px solid #333;
    border-radius: 5px;
    display: inline-block;
}

input[type="checkbox"] {
    height: 25px;
    width: 25px;
    accent-color: #000;
    display: block;
}

input[type="button"],
input[type="submit"] {
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

input[type="button"]:hover,
input[type="submit"]:hover {
    background: #8d99ae;
    color: #111;
}
</style>
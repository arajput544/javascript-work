const cors = require('cors');

const express= require('express');

const app=express();
const port = 8880;

const projects=require('./api/routes/projects');
const tasks = require('./api/routes/tasks');
const users = require('./api/routes/users');

app.use(cors());

app.use(express.json());
app.use('/projects',projects);
app.use('/tasks', tasks);
app.use('/users', users);

app.listen(port,() => {
    console.log(`Server is listening to ${port}`);
});
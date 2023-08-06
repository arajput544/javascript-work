/* eslint-disable camelcase */
// Import the mongoose module
const mongoose = require('mongoose');

const Project = require('../api/models/project');
const Task = require('../api/models/task');
const User = require('../api/models/user');

const { username, password, dbName } = require('../config.json');
const URL = ``;
mongoose
    .connect(URL)
    .then(() => console.log('Connected to Mongo'))
    .catch(() => console.log('Failed to Connect'));

const seedData = async () => {
    // clean Users collection
    await User.deleteMany({});

    // create some users
    const manager = await User.create({});

    const user = await User.create({});

    const inactive_user = await User.create({});

    // clean Projects collection
    await Project.deleteMany({});

    // create some projects with VALID relationships
    // associate a user or users to the project because they are not associated to any other project
    const project = await Project.create({});

    const project_two = await Project.create({});

    // clean the Tasks collection
    await Task.deleteMany({});

    // create some Tasks with VALID relationships
    // associate a project to the task
    // associate a user to the task because that user is associated to the project
    const task_one = await Task.create({});

    const task_two = await Task.create({});

    const task_three = await Task.create({});
};
// seedData();

const runQueries = async () => {
    const user = await User.findById('');
    console.log('USER');
    console.log(JSON.stringify(user, null, 2));

    const taskDetails = await Task.findById('')
        .populate('project', 'name description')
        .populate('user');

    console.log('TASK');
    console.log(taskDetails);
    console.log(JSON.stringify(taskDetails, null, 2));

    const projectDetail = await Project.findById('')
        .populate('manager')
        .populate('tasks', 'name details status');

    console.log('PROJECT');
    console.log(JSON.stringify(projectDetail, null, 2));

    mongoose.connection.close();
};
// runQueries();

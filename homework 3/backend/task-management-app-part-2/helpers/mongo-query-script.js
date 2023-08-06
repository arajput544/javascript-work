/* eslint-disable camelcase */
// Import the mongoose module
const mongoose = require('mongoose');

const Project = require('../api/models/project');
const Task = require('../api/models/task');
const User = require('../api/models/user');
mongoose.set('strictQuery', false);
const { username, password, dbName } = require('../config.json');
const URL = `mongodb+srv://${username}:${password}@cluster0.fas4may.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose
    .connect(URL)
    .then(() => console.log('Connected to Mongo'))
    .catch(() => console.log('Failed to Connect'));



const seedData = async () => {
    // clean Users collection
//     await User.deleteMany({});
//     console.log("Hi how are you")
//     // create some users
//     const manager = await User.create({
//     first : 'vijaye',
//     last:'shekar',
//     position : 'manager' ,
//     isActive : true

// });

//     const user = await User.create({
//         first: "raj",
//         last:"sharma",
//         position:"assosciate manager" ,
//         isActive : true
//     });

//     const inactive_user = await User.create({
//         first: "rajendra",
//         last:"verma",
//         position:"manager" ,
//         isActive : false
//     });

    // clean Projects collection
    // await Project.deleteMany({});

    // // create some projects with VALID relationships
    // // associate a user or users to the project because they are not associated to any other project
    // const project = await Project.create({
    //     name : 'ElevatorProject',
    //     description : 'This project is based on designing a software for elevator',    
    //     repository:'www.github.com/elevatorproject',
    //     manager: '63953427b670c709bcb871e2'

    // });

    // const project_two = await Project.create({
    //     name: 'CarWash',
    //     description: 'This project is designing software for car wash',
    //     repository : 'www.github.com/carwash' ,
    //     manager : '63953428b670c709bcb871e6',
    // });

    // clean the Tasks collection
    // await Task.deleteMany({});

    // create some Tasks with VALID relationships
    // associate a project to the task
    // associate a user to the task because that user is associated to the project
    // const task_one = await Task.create({
    // name : 'web dev',
    // details : 'web dev of a software',
    // priority : 'high',
    // status : 'completed',
    // timeline : 
    //     {
    //         assigned : '09-21-2022',
    //         due : '09-22-2022',
    //         last_updated :'09-25-2022'
    //     },
    // user: '63953427b670c709bcb871e2',
    // project : '639535f76c768dd94e3adbce'
    // });

    const task_two = await Task.create({
        
        name: 'testing'  ,
        details : 'testing of a software' ,
        priority : 'medium' ,
        status:'in-review',
        timeline : {
                assigned : "09-10-2022",
                due  : "09-20-2022",
                last_updated :"09-15-2022"
            },
        
        user: '63953428b670c709bcb871e6',
        project:'63953880542fb63d1249b853'
    });

    // const task_three = await Task.create({});
};
seedData();

// const runQueries = async () => {
//     const user = await User.findById('');
//     console.log('USER');
//     console.log(JSON.stringify(user, null, 2));

//     const taskDetails = await Task.findById('')
//         .populate('project', 'name description')
//         .populate('user');

//     console.log('TASK');
//     console.log(taskDetails);
//     console.log(JSON.stringify(taskDetails, null, 2));

//     const projectDetail = await Project.findById('')
//         .populate('manager')
//         .populate('tasks', 'name details status');

//     console.log('PROJECT');
//     console.log(JSON.stringify(projectDetail, null, 2));

//     mongoose.connection.close();
// };
// runQueries();

// seedData();
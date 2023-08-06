const mongoose = require('mongoose');

const Project = require('./projects');
const Task = require('./tasks');
const User = require('./users');

const { username, password, dbName } = require('./config.json');
const { findById } = require('./projects');


const mongourl = `mongodb+srv://captaincool73:${password}@cluster0.fas4may.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongourl,()=>{
    console.log('Connected to mongo');
});
const execScript = async () =>{
await Project.deleteMany({});

// const project = await Project.create({
//     name : 'ElevatorProject',
//     description : 'This project is based on designing a software for elevator',
//     manager : 'John',
//     assosciate_repository_url:'www.github.com/elevatorproject'  

// })


// const project1 = await Project.create(
//     {
//         name: 'DistrictAttorney',
//       description : 'This project is designing software for district attorney',
//       assosciate_repository_url : 'www.github.com/districtattorney' ,
//       manager : 'jack',
    
//     }

// )

// const project2 = await Project.create(
//     {
//         name: 'CarWash',
//       description: 'This project is designing software for car wash',
//       assosciate_repository_url : 'www.github.com/carwash' ,
//       manager : 'logan',
//     }
// )

// const project3 = await Project.create(
//     {
//         name: 'HousingCompany',
//       description: 'This project is designing software for housing company',
//       assosciate_repository_url :   'www.github.com/housingcompany',
//       manager : 'sebastian'
//     }
// )

await Task.deleteMany({});

const task = await Task.create({
    name : 'web dev',
    details : 'web dev of a software',
    priority : 'high',
    status : 'completed',
    timeline : 
        {
            date_assigned : '09-21-2022',
            date_due : '09-22-2022',
            date_updated :'09-25-2022'
        }
})

const task1 = await Task.create(
    {
        name: 'testing'  ,
        details : 'testing of a software' ,
        priority : 'medium' ,
        status:'in-review',
        timeline : {
            date_assigned : "09-10-2022",
            date_due  : "09-20-2022",
            date_updated :"09-15-2022"
        }
    }
)

const task2 = await Task.create(
    {
        name: "QA"  ,
        details : "QA of a software" ,
        priority : "low" ,
        status:"in-review",
        timeline : {
            date_assigned : "09-20-2022",
            date_due : "09-20-2022",
            date_updated:"09-25-2022"
        }
    }
)

const task3 = await Task.create(
    {
        name: "web dev"  ,
        details : "web dev of a software" ,
        priority : "high" ,
        status:"completed",
            timeline : {
                date_assigned : "09-21-2022",
                date_due : "09-22-2022",
                date_updated :"09-25-2022"
            }
    }
)

const task4 = await Task.create(
    {
        name: "encryption"  ,
            details : "encryption of a software" ,
            priority : "high" ,
            status:"completed",
            timeline : {
                date_assigned : "09-12-2022",
                date_due : "09-22-2022",
                date_updated :"09-30-2022"
            }
    }
)

const task5 = await Task.create(
    {
        name: "project life cycle"  ,
            details : "project life cycle of a software" ,
            priority : "medium" ,
            status : "in-review",
            timeline : {
                date_assigned : "09-23-2022",
                date_due : "09-25-2022",
                date_updated :"09-30-2022"
            }
        }
)

await User.deleteMany({});

const user = await User.create({
    first_name : 'vijaye',
    last_name:'shekar',
    position : 'assistant manager' ,
    status : true
}
)

const user1 = await User.create(
    {
        first_name: "raj",
        last_name:"sharma",
        position:"assosciate manager" ,
        status : true
    }
)

const user2 = await User.create(
    {
        first_name: "rajendra",
        last_name:"verma",
        position:"manager" ,
        status : true
    }
)

const user3 = await User.create(
    {
        first_name : "john",
        last_name :"morgan",
        position :"tech lead" ,
        status : true
    }
)

const user4 = await User.create(
    {
        first_name: "jack",
        last_name:"velch",
        position:"project head" ,
        status : true
    
    }
)

const user5 = await User.create(
    {
        first_name: "rohan",
        last_name:"pandey",
        position:"hr" ,
        status : true
    }
)

//  2. Write a query which uses your User model and interacts with your Mongo Users collection to get a user by id.

// Print to the console the user document
// Yes, you may hard code the _id in the query.

const find = await User.findById(user._id);
const find2 = await User.findById(user._id);
console.log(find);
console.log(find2);



};
execScript();


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
    {
        name : String,
        details : String,
        priority : {
            type : String,
            enum : ['high','medium','low']
        },
        status : {
            type : String,
            enum : ['in-progress','in-review','completed']
        },
        timeline : {
            date_assigned : Date,
            date_due : Date,
            date_updated : Date
        },
        users : [{type: mongoose.Schema.Types.ObjectId, ref : 'User'}],
        tasks : [{type: mongoose.Schema.Types.ObjectId, ref : 'Task'}]
        
    })

const Task = mongoose.model('Task',TaskSchema);

module.exports = Task;
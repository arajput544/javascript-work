const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 

const ProjectSchema = new Schema(
    {
        name : {
            type : String,
            indexe : {unique : true}
    },
    description : String,
    assosciate_repository_url : String,
    manager :  String,
    tasks_id : [{type : mongoose.Schema.Types.ObjectId, ref : 'Task'}],
    users_id : [{type : mongoose.Schema.Types.ObjectId, ref : 'User'}]
}
);

const Project  = mongoose.model('Project',ProjectSchema);

module.exports = Project;
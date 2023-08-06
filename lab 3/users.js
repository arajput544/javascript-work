const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name : String,
    last_name : String,
    position : String,
    status : Boolean,
    project : [{type : mongoose.Schema.Types.ObjectId , ref : 'Project'}]
})


const User = mongoose.model('User',UserSchema);

module.exports = User;
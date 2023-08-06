const User = require('../models/User');

const SharedService = require('../services/shared');

const getAllUsers = async (query) => {
    if (query.isActive) {
        const isActive = query.isActive === 'true';
        return await User.find({ isActive });
    }

    return await SharedService.all(User);
};

const getUserById = async (id) => await SharedService.get(User, id);

const updateUser = async (id, body) => {
    // require these Services inside the function to avoid circular dependency error
    const ProjectService = require('../services/project');
    const TaskService = require('../services/task');

    if (!body.isActive) {
        // when setting the user to inactive remove their associated project and tasks
        await TaskService.removeTaskUser(id);
        await ProjectService.removeProjectUser(id);
    }
    return await SharedService.update(User, id, body);
};

// IMPORTANT
// this support function has logic that is based off the Mongoose Models
// and those Models define the relationship between Project, Task and User
const getUsersProject = async (users) => {
    if (users instanceof Array) {
        return await User.find({ _id: users }).populate('project', 'name');
    } else {
        return await User.findOne({ _id: users }).populate('project', 'name');
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    getUsersProject
};

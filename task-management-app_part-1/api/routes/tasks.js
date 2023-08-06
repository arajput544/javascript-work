const router = require('express').Router();

const tasks = require('../../mock_data/tasks');

// GET /tasks
router.get('/', (req, res) => {
    res.json(tasks);
});

// POST /tasks
router.post('/', (req, res) => {
    const { body } = req;

    // THIS SOLUTION IS FOR MOCK DATA ONLY
    // USE MONGO DB AND QUERIES FOR HOMEWORK 2
    // MONGO SHOULD GENERATE _id
    const _id = tasks.length + 1;
    res.json({ ...body, _id });
});

// GET /tasks/:id
router.get('/:id', (req, res) => {
    const {
        params: { id }
    } = req;

    const task = tasks.find((task) => task._id === parseInt(id));

    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ error: `Task with ${id} not found.` });
    }
});

// PUT /tasks/:id
router.put('/:id', (req, res) => {
    const {
        params: { id },
        body
    } = req;

    const task = tasks.find((task) => task._id === parseInt(id));

    // THIS SOLUTION IS FOR MOCK DATA ONLY
    // USE MONGO DB AND QUERIES FOR HOMEWORK 2
    if (task) {
        // if the task is in assigned state then merge all data from body into matching task
        if (task.status === 'assigned') {
            res.json({ ...task, ...body });
        }
        // else if the body includes a status - then only merge the status into matching task
        else if (body.status) {
            res.json({ ...task, status: body.status });
        }
        // else respond that the task cannot be updated
        else {
            res.status(403).json({
                error: `Task cannot be updated because status is ${task.status}`
            });
        }
    } else {
        res.status(404).json({ error: `Task with ${id} not found.` });
    }
});

// DELETE /tasks/:id
router.delete('/:id', (req, res) => {
    const {
        params: { id }
    } = req;

    const task = tasks.find((task) => task._id === parseInt(id));

    if (task) {
        res.json({ deleted: task.name });
    } else {
        res.status(404).json({ error: `Task with ${id} not found.` });
    }
});

module.exports = router;

const router = require('express').Router();

const projects = require('../../mock_data/projects');
const tasks = require('../../mock_data/tasks');

// GET /projects
router.get('/', (req, res) => {
    const { query } = req;

    let matches = projects;

    if (query.name) {
        matches = projects.filter((project) =>
            project.name.toLowerCase().includes(query.name.toLowerCase())
        );
    }

    res.json(matches);
});

// POST /projects
router.post('/', (req, res) => {
    const { body } = req;

    // THIS SOLUTION IS FOR MOCK DATA ONLY
    // USE MONGO DB AND QUERIES FOR HOMEWORK 2

    // when creating a new project search mock data for name match by lower case
    const nameMatch = projects.find(
        (project) => project.name.toLowerCase() === body.name.toLowerCase()
    );

    if (!nameMatch) {
        // THIS SOLUTION IS FOR MOCK DATA ONLY
        // USE MONGO DB AND QUERIES FOR HOMEWORK 2
        // MONGO SHOULD GENERATE _id
        const _id = projects.length + 1;
        res.json({ ...body, _id });
    } else {
        res.status(409).json({
            error: `Project with ${body.name} already exists.`
        });
    }
});

// GET /projects/:id

router.get('/:id', (req, res) => {
    const {
        params: { id }
    } = req;

    const project = projects.find((project) => project._id === parseInt(id));

    if (project) {
        // THIS SOLUTION IS FOR MOCK DATA ONLY
        // USE MONGO DB AND QUERIES FOR HOMEWORK 2

        // find the associated projects by going through tasks and matching to project id
        const associatedtasks = tasks.filter(
            (task) => task.project === project._id
        );

        res.json({
            ...project,
            user_count: project.users.length,
            task_count: associatedtasks.length
        });
    } else {
        res.status(404).json({ error: `Project with ${id} not found.` });
    }
});

// PUT /projects/:id
router.put('/:id', (req, res) => {
    const {
        params: { id },
        body
    } = req;

    const project = projects.find((project) => project._id === parseInt(id));

    if (project) {
        // THIS SOLUTION IS FOR MOCK DATA ONLY
        // USE MONGO DB AND QUERIES FOR HOMEWORK 2

        // if the PUT body contains the project's name and that name was not changed
        // search the mock data for projects where the project name is the same as the body
        // AND that id is not the same as the body
        const nameMatch = projects.find(
            (project) =>
                project.name.toLowerCase() === body.name.toLowerCase() &&
                project._id !== parseInt(id)
        );

        if (!nameMatch) {
            res.json({ ...project, ...body });
        } else {
            res.status(409).json({
                error: `Project with ${body.name} already exists.`
            });
        }
    } else {
        res.status(404).json({ error: `Project with ${id} not found.` });
    }
});

module.exports = router;

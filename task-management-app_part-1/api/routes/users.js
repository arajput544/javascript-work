const router = require('express').Router();

const users = require('../../mock_data/users');

// GET /users
router.get('/', (req, res) => {
    const { query } = req;

    let matches = users;

    // THIS SOLUTION IS FOR MOCK DATA ONLY
    // USE MONGO DB AND QUERIES FOR HOMEWORK 2
    if (query.isActive) {
        // return a boolean by comparing the query param to lower case to the string true
        const activeFlag = query.isActive.toLowerCase() === 'true';
        matches = users.filter((user) => user.isActive === activeFlag);
    }

    res.json(matches);
});

// GET /users/:id
router.get('/:id', (req, res) => {
    const {
        params: { id }
    } = req;

    const user = users.find((user) => user._id === parseInt(id));

    if (user) {
        res.json({ ...user });
    } else {
        res.status(404).json({ error: `User with ${id} not found.` });
    }
});

// PUT /users/:id
router.put('/:id', (req, res) => {
    const {
        params: { id },
        body
    } = req;

    const user = users.find((user) => user._id === parseInt(id));

    if (user) {
        res.json({ ...user, ...body });
    } else {
        res.status(404).json({ error: `User with ${id} not found.` });
    }
});

module.exports = router;

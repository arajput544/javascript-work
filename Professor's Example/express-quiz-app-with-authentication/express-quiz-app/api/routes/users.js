const router = require('express').Router();

const User = require('../controllers/user');

// POST /users/register to register a new account
router.post('/register', User.registerUser);

module.exports = router;

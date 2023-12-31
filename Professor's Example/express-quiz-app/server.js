// start the server: npm run start

// require in our dependencies
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

// require in mongo config
const { username, password, dbName } = require('./config.json');

// call the express function which create the express application
// this allows us to use the full functionality of our express application
const app = express();
const port = 8888;

// require in our route resource
const answers = require('./api/routes/answers');
const questions = require('./api/routes/questions');
const quizzes = require('./api/routes/quizzes');

// apply our cors middleware
app.use(cors());

// middleware to parse POST/PUT bodies in express
app.use(express.json());

// add resource route to our express application
app.use('/answers', answers);
app.use('/questions', questions);
app.use('/quizzes', quizzes);

// start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

const mongoURL = `mongodb+srv://${username}:${password}@cluster0.epdxv4e.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(mongoURL, () => {
    console.log('Connected to Mongo');
});

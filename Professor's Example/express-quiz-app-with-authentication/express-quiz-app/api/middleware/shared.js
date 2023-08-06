const addTimestamp = (req, res, next) => {
    console.log('Running Router Level Middleware');

    const now = new Date().toISOString();
    if (req.method === 'POST' && req.body) {
        const { body } = req;

        body.created = now;
    } else if (req.method === 'PUT' && req.body) {
        const { body } = req;

        body.last_updated = now;
    }

    // this middleware is done processing and move on to the next thing in line
    next();
};

module.exports = {
    addTimestamp
};

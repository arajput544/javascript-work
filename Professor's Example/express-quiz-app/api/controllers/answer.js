const AnswerService = require('../services/Answer');

const getAnswerById = async (req, res) => {
    const { params } = req;
    const id = params.id;

    try {
        const Answers = await AnswerService.getAnswerById(id);
        res.json(Answers);
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};

module.exports = {
    getAnswerById,
};

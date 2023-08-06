const Answer = require('../models/Answer');

const SharedService = require('../services/shared');

const getQuestyionById = async (id) => await SharedService.get(Answer, id);

const createAnswer = async (body) => await SharedService.create(Answer, body);

const removeAnswer = async (id) => await SharedService.remove(Answer, id);

module.exports = {
    getQuestyionById,
    createAnswer,
    removeAnswer
};

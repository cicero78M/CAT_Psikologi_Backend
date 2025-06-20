const rabbit = require('../config/rabbitmq');
const Question = require('../models/question');

exports.create = async (req, res) => {
  try {
    const question = await Question.create(req.body.text);
    await rabbit.sendToQueue('questions', { action: 'create', data: question });
    res.json(question);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Creation failed' });
  }
};

exports.getAll = async (req, res) => {
  const questions = await Question.findAll();
  res.json(questions);
};

exports.getById = async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) {
    return res.status(404).json({ message: 'Question not found' });
  }
  res.json(question);
};

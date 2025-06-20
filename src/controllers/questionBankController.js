const QuestionBank = require('../models/questionBank');

exports.create = async (req, res) => {
  try {
    const bank = await QuestionBank.create(req.body.name, req.body.description);
    res.json(bank);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Creation failed' });
  }
};

exports.getAll = async (req, res) => {
  const banks = await QuestionBank.findAll();
  res.json(banks);
};

exports.getById = async (req, res) => {
  const bank = await QuestionBank.findById(req.params.id);
  if (!bank) {
    return res.status(404).json({ message: 'Question bank not found' });
  }
  res.json(bank);
};

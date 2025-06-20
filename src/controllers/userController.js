const User = require('../models/user');

exports.getAll = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

exports.getById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

exports.update = async (req, res) => {
  try {
    const user = await User.update(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed' });
  }
};

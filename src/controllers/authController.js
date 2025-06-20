const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');
const rabbit = require('../config/rabbitmq');

exports.register = async (req, res) => {
  // TODO: save user to database
  await rabbit.sendToQueue('users', { action: 'register', email: req.body.email });
  res.json({ message: 'register' });
};

exports.login = async (req, res) => {
  // TODO: validate user credentials
  const payload = { id: 1, email: req.body.email }; // placeholder user
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
  await redisClient.set(token, JSON.stringify(payload), { EX: 3600 });
  res.json({ token });
};

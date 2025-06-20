const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const redisClient = require('../config/redis');
const rabbit = require('../config/rabbitmq');
const User = require('../models/user');

exports.register = async (req, res) => {
  try {
    const passwordHash = crypto
      .createHash('sha256')
      .update(req.body.password)
      .digest('hex');
    const user = await User.create(req.body.email, passwordHash);
    await rabbit.sendToQueue('users', { action: 'register', email: user.email });
    res.json({ id: user.id, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findByEmail(req.body.email);
    const passwordHash = crypto
      .createHash('sha256')
      .update(req.body.password)
      .digest('hex');
    if (!user || user.password_hash !== passwordHash) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });
    await redisClient.set(token, JSON.stringify(payload), { EX: 3600 });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
};

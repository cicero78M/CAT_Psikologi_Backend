const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');

module.exports = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const stored = await redisClient.get(token);
    if (!stored) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = JSON.parse(stored);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

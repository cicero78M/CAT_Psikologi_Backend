require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const { createClient } = require('redis');
const amqp = require('amqplib');

const app = express();
app.use(express.json());

const jwtSecret = process.env.JWT_SECRET || 'secret';

// Redis setup
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const redisClient = createClient({ url: redisUrl });
redisClient.on('error', (err) => console.error('Redis error', err));
redisClient.connect().then(() => console.log('Redis connected')).catch(console.error);

// RabbitMQ setup
let mqChannel;
async function initRabbit() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    mqChannel = await connection.createChannel();
    await mqChannel.assertQueue('tasks');
    console.log('RabbitMQ connected');
  } catch (err) {
    console.error('RabbitMQ connection error', err);
  }
}
initRabbit();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.post('/login', (req, res) => {
  const username = req.body.username;
  if (!username) return res.status(400).json({ error: 'username required' });
  const user = { name: username };
  const token = jwt.sign(user, jwtSecret, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/cache', async (req, res) => {
  try {
    let greeting = await redisClient.get('greeting');
    if (!greeting) {
      greeting = 'hello world';
      await redisClient.set('greeting', greeting);
    }
    res.json({ greeting });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'redis error' });
  }
});

app.post('/publish', authenticateToken, async (req, res) => {
  const msg = req.body.message || 'Hello from RabbitMQ';
  if (!mqChannel) {
    return res.status(500).json({ error: 'RabbitMQ not connected' });
  }
  mqChannel.sendToQueue('tasks', Buffer.from(msg));
  res.json({ status: 'sent', message: msg });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

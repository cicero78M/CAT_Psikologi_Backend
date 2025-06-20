const amqp = require('amqplib');

let channel;

async function connect() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
  channel = await connection.createChannel();
}

async function sendToQueue(queue, message) {
  if (!channel) {
    await connect();
  }
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
}

module.exports = { sendToQueue };

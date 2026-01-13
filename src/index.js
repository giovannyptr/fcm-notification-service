require('dotenv').config();
const amqp = require('amqplib');

const { sendFCM } = require('./services/fcmService');
const { saveJob } = require('./db/fcmJobRepo');
const { publishDone } = require('./publishers/donePublisher');

function isValidMessage(msg) {
  return (
    msg &&
    typeof msg.identifier === 'string' &&
    typeof msg.type === 'string' &&
    typeof msg.deviceId === 'string' &&
    typeof msg.text === 'string'
  );
}

async function start() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();

  console.log('✅ Connected to RabbitMQ');

  await channel.assertQueue(process.env.FCM_QUEUE);
  console.log('✅ Queue ready:', process.env.FCM_QUEUE);

  console.log('👂 Waiting for messages...');

  channel.consume(process.env.FCM_QUEUE, async (msg) => {
    if (!msg) return;

    let payload;

    try {
      payload = JSON.parse(msg.content.toString());
    } catch {
      channel.nack(msg, false, false);
      return;
    }

    if (!isValidMessage(payload)) {
      channel.nack(msg, false, false);
      return;
    }

    // ACK after validation (SPEC)
    channel.ack(msg);

    const success = await sendFCM(payload);

    if (success) {
      const deliverAt = new Date();
      await saveJob(payload.identifier, deliverAt);
      await publishDone(channel, payload.identifier, deliverAt);
      console.log('🎉 Message fully completed');
    }
  });
}

start().catch(console.error);

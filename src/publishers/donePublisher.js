async function publishDone(channel, identifier, deliverAt) {
  await channel.assertExchange(process.env.DONE_TOPIC, 'fanout');

  const payload = {
    identifier,
    deliverAt,
  };

  channel.publish(
    process.env.DONE_TOPIC,
    '',
    Buffer.from(JSON.stringify(payload))
  );

  console.log('📣 Published to notification.done');
}

module.exports = { publishDone };

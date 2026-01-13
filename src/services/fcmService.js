async function sendFCM(message) {
  console.log('📡 Sending FCM...');
  console.log('➡️ To device:', message.deviceId);
  console.log('📝 Message:', message.text);

  // simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log('✅ FCM sent successfully');
  return true; // pretend HTTP 200
}

module.exports = { sendFCM };

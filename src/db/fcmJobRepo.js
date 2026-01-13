const pool = require('./mysql');

async function saveJob(identifier, deliverAt) {
  await pool.execute(
    'INSERT INTO fcm_job (identifier, deliverAt) VALUES (?, ?)',
    [identifier, deliverAt]
  );

  console.log('💾 Saved to DB:', identifier);
}

module.exports = { saveJob };

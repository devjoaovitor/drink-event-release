const { Client } = require('pg');

function getClient() {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL,
  });

  return client;
}

module.exports = {
  getClient,
};
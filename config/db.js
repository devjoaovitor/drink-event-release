const { Client } = require('pg');

function getClient() {
  const client = new Client({
      connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  });

  return client;
}

module.exports = {
  getClient,
};

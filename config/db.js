const { Client } = require('pg');

function getClient() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'tcc',
    user: 'postgres',
    password: 'admin',
  });

  return client;
}

module.exports = {
  getClient,
};

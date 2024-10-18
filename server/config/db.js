const { Client } = require('pg');
require('dotenv').config();

const client = new Client(process.env.PG_URL);
client.connect(err => {
  if (err) {
    console.log(err)
  } else {
    console.log('connexion OK')
  }
})

module.exports = client;
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'learning_system',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;
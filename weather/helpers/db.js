const mysql = require('mysql2');
const logger = require('./winston')
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'weather',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = {
    pool
}
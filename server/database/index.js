const mysql = require('mysql2');
const settings = require('./config');

const pool = mysql.createPool(settings);

module.exports = pool;
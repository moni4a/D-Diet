require('dotenv').config({ path: 'config/.env' });

const {
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_SCHEMA,
  DB_PORT,
} = process.env;

module.exports = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  port: DB_PORT,
  database: DB_SCHEMA,
}
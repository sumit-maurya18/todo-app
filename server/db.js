require("dotenv").config();
const { Pool } = require("pg");

const isLocal = process.env.DB_HOST === "localhost";

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  ssl: isLocal ? false : { rejectUnauthorized: false }, // ✅ needed for Neon
});

module.exports = pool;

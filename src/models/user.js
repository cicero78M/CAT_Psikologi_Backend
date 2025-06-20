const db = require('../config/database');

async function createTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )`);
}

async function create(email, password) {
  const result = await db.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
    [email, password]
  );
  return result.rows[0];
}

async function findByEmail(email) {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
}

async function findById(id) {
  const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
}

async function findAll() {
  const result = await db.query('SELECT * FROM users ORDER BY id');
  return result.rows;
}

module.exports = {
  createTable,
  create,
  findByEmail,
  findById,
  findAll,
};

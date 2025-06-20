const db = require('../config/database');

async function createTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS questions (
      id SERIAL PRIMARY KEY,
      text TEXT NOT NULL
    )`);
}

async function create(text) {
  const result = await db.query(
    'INSERT INTO questions (text) VALUES ($1) RETURNING *',
    [text]
  );
  return result.rows[0];
}

async function findAll() {
  const result = await db.query('SELECT * FROM questions ORDER BY id');
  return result.rows;
}

async function findById(id) {
  const result = await db.query('SELECT * FROM questions WHERE id = $1', [id]);
  return result.rows[0];
}

module.exports = {
  createTable,
  create,
  findAll,
  findById,
};

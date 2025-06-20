const db = require('../config/database');

async function createTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS question_banks (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT
    )
  `);
}

async function create(name, description) {
  const result = await db.query(
    'INSERT INTO question_banks (name, description) VALUES ($1, $2) RETURNING *',
    [name, description]
  );
  return result.rows[0];
}

async function findAll() {
  const result = await db.query('SELECT * FROM question_banks ORDER BY id');
  return result.rows;
}

async function findById(id) {
  const result = await db.query('SELECT * FROM question_banks WHERE id = $1', [id]);
  return result.rows[0];
}

module.exports = {
  createTable,
  create,
  findAll,
  findById,
};

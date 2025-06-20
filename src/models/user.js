const db = require('../config/database');

async function createTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE,
      full_name TEXT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'student',
      avatar_url TEXT,
      bio TEXT,
      date_of_birth DATE,
      gender TEXT,
      phone_number TEXT,
      address TEXT,
      organization TEXT,
      preferences JSONB,
      settings JSONB,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      last_login TIMESTAMPTZ,
      status TEXT DEFAULT 'active',
      email_verified BOOLEAN DEFAULT false,
      two_factor_enabled BOOLEAN DEFAULT false,
      locale TEXT,
      timezone TEXT,
      metadata JSONB
    )`);
}

async function create(email, passwordHash) {
  const result = await db.query(
    'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
    [email, passwordHash]
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

async function update(id, data) {
  const keys = Object.keys(data);
  if (keys.length === 0) return findById(id);
  const setClauses = keys.map((k, i) => `${k} = $${i + 1}`);
  const values = keys.map((k) => data[k]);
  values.push(id);
  await db.query(
    `UPDATE users SET ${setClauses.join(', ')}, updated_at = NOW() WHERE id = $${
      keys.length + 1
    }`,
    values
  );
  return findById(id);
}

module.exports = {
  createTable,
  create,
  findByEmail,
  findById,
  findAll,
  update,
};


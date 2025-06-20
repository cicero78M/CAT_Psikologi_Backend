const db = require('../config/database');

async function createTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS classes (
      id SERIAL PRIMARY KEY,
      name TEXT,
      instructor_id INTEGER REFERENCES users(id),
      invite_code TEXT UNIQUE
    )
  `);
  await db.query(`
    CREATE TABLE IF NOT EXISTS class_members (
      class_id INTEGER REFERENCES classes(id),
      user_id INTEGER REFERENCES users(id),
      PRIMARY KEY (class_id, user_id)
    )
  `);
}

async function create(name, instructorId, inviteCode) {
  const result = await db.query(
    'INSERT INTO classes (name, instructor_id, invite_code) VALUES ($1, $2, $3) RETURNING *',
    [name, instructorId, inviteCode]
  );
  return result.rows[0];
}

async function findAll() {
  const result = await db.query('SELECT * FROM classes ORDER BY id');
  return result.rows;
}

async function findById(id) {
  const result = await db.query('SELECT * FROM classes WHERE id = $1', [id]);
  return result.rows[0];
}

async function findByInviteCode(code) {
  const result = await db.query('SELECT * FROM classes WHERE invite_code = $1', [code]);
  return result.rows[0];
}

async function addMember(classId, userId) {
  await db.query(
    'INSERT INTO class_members (class_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
    [classId, userId]
  );
  return getMembers(classId);
}

async function getMembers(classId) {
  const result = await db.query(
    'SELECT u.* FROM class_members cm JOIN users u ON cm.user_id = u.id WHERE cm.class_id = $1',
    [classId]
  );
  return result.rows;
}

module.exports = {
  createTable,
  create,
  findAll,
  findById,
  findByInviteCode,
  addMember,
  getMembers,
};

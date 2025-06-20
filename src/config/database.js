const { Pool } = require('pg');

// Create a connection pool using DATABASE_URL or a local fallback.
// The pool exposes a `query` method used by the models.
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/cat',
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

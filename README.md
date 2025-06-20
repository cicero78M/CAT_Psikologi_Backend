# CAT Psikologi Backend

This is a simple backend skeleton for a Computerized Adaptive Testing (CAT) application.

## Getting Started

Install dependencies and start the development server. Environment variables can
be placed in a `.env` file at the project root. Ensure PostgreSQL is running and
`DATABASE_URL` is configured:

```bash
npm install
node src/index.js
```

## Project Structure

- `src/index.js` - entry point for the Express server
- `src/routes/` - application routes
- `src/controllers/` - route controllers
- `src/models/` - database models
- `src/middlewares/` - Express middlewares
- `src/config/` - configuration files

## User Profile

The `users` table now stores extended profile information such as `username`,
`full_name`, `avatar_url` and more. Passwords are stored as SHA-256 hashes in
`password_hash`.

### Endpoints

- `POST /api/auth/register` – register a new user
- `POST /api/auth/login` – obtain a JWT token
- `GET /api/users` – list users (requires auth)
- `GET /api/users/:id` – get user by id (requires auth)
- `PUT /api/users/:id` – update profile fields (requires auth)
- `POST /api/question-banks` – create a question bank (requires auth)
- `GET /api/question-banks` – list question banks (requires auth)
- `GET /api/question-banks/:id` – get bank by id (requires auth)

## Class Management
- `POST /api/classes` – create a class (requires auth)
- `GET /api/classes` – list classes (requires auth)
- `GET /api/classes/:id` – get class by id (requires auth)
- `POST /api/classes/join` – join a class with invite code (requires auth)
- `GET /api/classes/:id/members` – list members of a class (requires auth)



## Configuration

Before starting the server, set the following environment variables or create a `.env` file with these values. At minimum, `DATABASE_URL` should point to your PostgreSQL instance. The connection string format is:

```
postgres://<username>:<password>@<host>:<port>/<database>
```

Example for a local database:

```bash
export DATABASE_URL=postgres://postgres:secret@localhost:5432/cat
```

If the database or user does not exist, create them first using `createdb` and `createuser` (or through your database administration tool).

For lebih detail mengenai proses bisnis, konvensi penamaan, struktur database dan FAQ, lihat [docs/README.md](docs/README.md).

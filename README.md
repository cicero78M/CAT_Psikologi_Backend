# CAT Psikologi Backend

This is a simple backend skeleton for a Computerized Adaptive Testing (CAT) application.

## Getting Started

Install dependencies and start the development server. Ensure PostgreSQL is
running and `DATABASE_URL` is configured:

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



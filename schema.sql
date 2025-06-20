-- Database schema for CAT Psikologi Backend

-- Users table
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
);

-- Difficulty levels
CREATE TABLE IF NOT EXISTS difficulty_levels (
    id SERIAL PRIMARY KEY,
    name TEXT
);

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    difficulty_id INTEGER REFERENCES difficulty_levels(id),
    irt_a NUMERIC,
    irt_b NUMERIC,
    irt_c NUMERIC
);

-- Categories and mapping
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS question_categories (
    question_id INTEGER REFERENCES questions(id),
    category_id INTEGER REFERENCES categories(id),
    PRIMARY KEY (question_id, category_id)
);

-- Exams and schedule
CREATE TABLE IF NOT EXISTS exams (
    id SERIAL PRIMARY KEY,
    title TEXT,
    description TEXT
);

CREATE TABLE IF NOT EXISTS exam_schedule (
    id SERIAL PRIMARY KEY,
    exam_id INTEGER REFERENCES exams(id),
    start_time TIMESTAMPTZ,
    duration_minutes INTEGER
);

-- Exam sessions
CREATE TABLE IF NOT EXISTS exam_sessions (
    id SERIAL PRIMARY KEY,
    exam_id INTEGER REFERENCES exams(id),
    user_id INTEGER REFERENCES users(id),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    finished_at TIMESTAMPTZ,
    current_ability NUMERIC,
    answers JSONB
);

-- Results for analytics
CREATE TABLE IF NOT EXISTS results (
    id SERIAL PRIMARY KEY,
    exam_session_id INTEGER REFERENCES exam_sessions(id),
    total_score NUMERIC,
    ability_estimate NUMERIC,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Classes and membership
CREATE TABLE IF NOT EXISTS classes (
    id SERIAL PRIMARY KEY,
    name TEXT,
    instructor_id INTEGER REFERENCES users(id),
    invite_code TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS class_members (
    class_id INTEGER REFERENCES classes(id),
    user_id INTEGER REFERENCES users(id),
    PRIMARY KEY (class_id, user_id)
);

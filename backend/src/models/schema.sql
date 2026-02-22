-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(64) UNIQUE NOT NULL,
  email VARCHAR(128) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Assets table
CREATE TABLE IF NOT EXISTS assets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  symbol VARCHAR(16) NOT NULL,
  protocol_id INTEGER REFERENCES protocols(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Protocols table
CREATE TABLE IF NOT EXISTS protocols (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

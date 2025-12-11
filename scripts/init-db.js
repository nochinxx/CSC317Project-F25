/**
 * Database Initialization Script
 *
 * Run this script to create the necessary tables in your PostgreSQL database.
 * Usage: npm run db:init
 */

require('dotenv').config();
const { pool } = require('../config/database');

const createTables = async () => {
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(20) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        has_profile_image BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Users table created');

    // Create profile_images table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS profile_images (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        data BYTEA NOT NULL,
        content_type VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Profile images table created');

        // Create categories table
        await pool.query(`
          CREATE TABLE IF NOT EXISTS categories (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            name TEXT NOT NULL,
            type TEXT NOT NULL CHECK (type IN ('income', 'expense'))
          )
        `);
        console.log('✓ Categories table created');
    
        // Create transactions table
        await pool.query(`
          CREATE TABLE IF NOT EXISTS transactions (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            category_id INTEGER REFERENCES categories(id),
            type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
            amount NUMERIC(10, 2) NOT NULL CHECK (amount >= 0),
            description TEXT,
            date DATE NOT NULL DEFAULT CURRENT_DATE,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
          )
        `);
        console.log('✓ Transactions table created');
    

    // Create session table for connect-pg-simple
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "session" (
        "sid" VARCHAR NOT NULL COLLATE "default",
        "sess" JSON NOT NULL,
        "expire" TIMESTAMP(6) NOT NULL,
        PRIMARY KEY ("sid")
      )
    `);

    // Create index on session expire for cleanup
    await pool.query(`
      CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire")
    `);
    console.log('✓ Session table created');

    // Create indexes for better query performance
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)
    `);
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)
    `);
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_profile_images_user_id ON profile_images(user_id)
    `);
    console.log('✓ Indexes created');

    console.log('\n✅ Database initialization complete!');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

createTables();

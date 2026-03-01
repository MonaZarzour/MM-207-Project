import pg from "pg";

const { Pool } = pg;

// Connection pool for PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Required for connecting to Render's hosted DB
    ssl: {
        rejectUnauthorized: false,
    },
});

export async function initDb() {
    const client = await pool.connect();
    try {
        // Create users table if it doesn't exist
        await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        display_name VARCHAR(255),
        password_hash VARCHAR(255) NOT NULL,
        tos_accepted_at VARCHAR(255),
        tos_version VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // We could add other tables here (e.g. lists, lists_items, sessions) 
        // to migrate everything to PostgreSQL in the future.

        console.log("Database initialized successfully.");
    } catch (err) {
        console.error("Error initializing database:", err);
        throw err;
    } finally {
        client.release();
    }
}

export function query(text, params) {
    return pool.query(text, params);
}

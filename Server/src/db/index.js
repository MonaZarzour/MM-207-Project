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

        // Create lists
        await client.query(`
          CREATE TABLE IF NOT EXISTS lists (
            id VARCHAR(255) PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          )
        `);

        // Create list_members
        await client.query(`
          CREATE TABLE IF NOT EXISTS list_members (
            list_id VARCHAR(255) REFERENCES lists(id) ON DELETE CASCADE,
            user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
            role VARCHAR(50) DEFAULT 'viewer',
            PRIMARY KEY (list_id, user_id)
          )
        `);

        // Create list_items
        await client.query(`
          CREATE TABLE IF NOT EXISTS list_items (
            id VARCHAR(255) PRIMARY KEY,
            list_id VARCHAR(255) REFERENCES lists(id) ON DELETE CASCADE,
            name VARCHAR(255) NOT NULL,
            quantity INTEGER DEFAULT 1,
            unit VARCHAR(50) DEFAULT 'pcs',
            done BOOLEAN DEFAULT false,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          )
        `);

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

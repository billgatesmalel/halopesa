// Database initialization and migration script for Neon Postgres
import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.log('Error: DATABASE_URL environment variable is missing.');
  console.log('Please set DATABASE_URL in .env or pass it when running:');
  console.log('DATABASE_URL="postgresql://user:pass@endpoint.neon.tech/neondb?sslmode=require" node scripts/init-db.js');
  process.exit(1);
}

const sql = neon(connectionString);

async function init() {
  console.log('Connecting to Neon Database...');
  
  try {
    // Create accounts table
    await sql`
      CREATE TABLE IF NOT EXISTS accounts (
        id SERIAL PRIMARY KEY,
        phone_number VARCHAR(20) UNIQUE NOT NULL,
        account_name VARCHAR(100) NOT NULL,
        balance NUMERIC(15, 2) NOT NULL DEFAULT 485250.00,
        currency VARCHAR(5) NOT NULL DEFAULT 'TZS',
        status VARCHAR(20) NOT NULL DEFAULT 'active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Table "accounts" verified/created.');

    // Create transactions table
    await sql`
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        tx_reference VARCHAR(50) UNIQUE NOT NULL,
        account_id INT REFERENCES accounts(id) ON DELETE SET NULL,
        title VARCHAR(150) NOT NULL,
        category VARCHAR(50) NOT NULL,
        amount NUMERIC(15, 2) NOT NULL,
        fee NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
        recipient VARCHAR(50),
        network VARCHAR(30) DEFAULT 'HALOPESA',
        status VARCHAR(20) NOT NULL DEFAULT 'completed',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Table "transactions" verified/created.');

    // Create agents table
    await sql`
      CREATE TABLE IF NOT EXISTS agents (
        id SERIAL PRIMARY KEY,
        agent_code VARCHAR(20) UNIQUE NOT NULL,
        name VARCHAR(120) NOT NULL,
        region VARCHAR(50) NOT NULL,
        district VARCHAR(50) NOT NULL,
        address VARCHAR(200) NOT NULL,
        phone VARCHAR(30) NOT NULL,
        hours VARCHAR(60) NOT NULL,
        is_verified BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Table "agents" verified/created.');

    // Seed default account
    await sql`
      INSERT INTO accounts (phone_number, account_name, balance, currency)
      VALUES ('+255 628 123 456', 'Amina Juma Mohamed', 485250.00, 'TZS')
      ON CONFLICT (phone_number) DO NOTHING;
    `;

    console.log('Neon Database schema setup completed successfully.');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

init();

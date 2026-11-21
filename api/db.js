import { neon } from '@neondatabase/serverless';

// Safe Neon Database connection
// If DATABASE_URL is not set, API handlers will serve demo state gracefully
export function getDb() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return null;
  }
  return neon(connectionString);
}

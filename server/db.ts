import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@shared/schema';

// For use with Vercel Postgres or Postgres.js
const connectionString = process.env.DATABASE_URL!;
// Use SSL for production environments
const ssl = process.env.NODE_ENV === 'production';

// Create postgres client with native SSL support
const client = postgres(connectionString, { ssl });

// Initialize drizzle with the client and schema
export const db = drizzle(client, { schema });
import { dev } from '$app/environment';
import { DB_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connection = dev ? postgres(DB_URL) : postgres(DB_URL, { ssl: 'require', prepare: false });

const db = drizzle(connection, { schema });

export { connection, db };

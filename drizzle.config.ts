import { defineConfig } from 'drizzle-kit';

// if (!process.env.DB_URL) throw new Error("DB_URL is not defined");
export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	out: './drizzle',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.DB_URL
	},
	verbose: true,
	strict: true
});

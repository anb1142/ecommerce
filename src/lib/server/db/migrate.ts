import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const connection = postgres(process.env.DB_URL as string, {
	max: 1
});

const db = drizzle(connection);

const migrator = async () => {
	console.log('migrating...');

	await migrate(db, { migrationsFolder: './drizzle' });
	await connection.end();

	console.log('migration ended');
	process.exit(0);
};

migrator();

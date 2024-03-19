import 'dotenv/config';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { connection, db } from '.';

const migrator = async () => {
	console.log('migrating...');
	await migrate(db, { migrationsFolder: './drizzle' });
	await connection.end();
	console.log('migration ended');
	process.exit(0);
};

try {
	migrator();
} catch (error) {
	process.exit(1);
}

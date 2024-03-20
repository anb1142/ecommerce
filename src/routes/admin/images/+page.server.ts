import { db } from '@/server/db';
import { image } from '@/server/db/schema';

export const load = async () => {
	const rows = await db.select().from(image);
	return {
		rows
	};
};

import { db } from '@/server/db';
import { category } from '@/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const rows = await db.select({ id: category.id, name: category.name }).from(category);
	return {
		rows
	};
};

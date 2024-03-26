import { db } from '@/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const rows = await db.query.category.findMany({
		limit: 15,
		columns: {
			id: true,
			name: true
		}
	});
	return {
		rows
	};
};

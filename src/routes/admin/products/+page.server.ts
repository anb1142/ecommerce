import { db } from '@/server/db';
import { product } from '@/server/db/schema';
import { asc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	try {
		const rows = await db.query.product.findMany({
			columns: { id: true, name: true, price: true, visible: true }
		});
		return {
			rows
		};
	} catch (error) {
		console.log(error);
	}
};

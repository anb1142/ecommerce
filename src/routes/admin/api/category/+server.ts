import { db } from '@/server/db/index.js';
import { json } from '@sveltejs/kit';
export async function GET({ url }) {
	const orderBy = (url.searchParams.get('orderBy') || 'id') as 'id' | 'name';
	const order = (url.searchParams.get('order') || 'asc') as 'asc' | 'desc';

	const data = await db.query.category.findMany({
		// offset: 15,
		limit: 15,
		columns: { id: true, name: true },
		orderBy: (categories, { asc, desc }) =>
			order === 'desc' ? [desc(categories[orderBy])] : [asc(categories[orderBy])]
	});

	return json(data);
}

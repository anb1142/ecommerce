import { db } from '@/server/db/index.js';
import { category } from '@/server/db/schema.js';
import { json } from '@sveltejs/kit';
import { asc, count, desc } from 'drizzle-orm';
export async function GET({ url }) {
	const orderBy = (url.searchParams.get('orderBy') || 'id') as 'id' | 'name';
	const order = (url.searchParams.get('order') || 'asc') as 'asc' | 'desc';
	const limit = (url.searchParams.get('limit') || 15) as number;
	const offset = (url.searchParams.get('offset') || 0) as number;

	const fetchRowCount = Promise.resolve(db.select({ count: count() }).from(category));
	const fetchRows = Promise.resolve(
		db
			.select({ id: category.id, name: category.name })
			.from(category)
			.limit(limit)
			.offset(offset)
			.orderBy(order === 'desc' ? desc(category[orderBy]) : asc(category[orderBy]))
	);
	const [rowCount, rows] = await Promise.all([fetchRowCount, fetchRows]);

	return json({ rowCount: rowCount[0].count, rows });
}

import { db } from '@/server/db';
import { product } from '@/server/db/schema';
import { asc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// const rows = await db
	// 	.select({ product_name: product.name, price: product.price, visible: product.visible })
	// 	.from(product);
	// .orderBy(product.name);
	const rows = await db.query.product.findMany({
		columns: { id: true, name: true, price: true, visible: true },
		orderBy: [asc(product['price'])]
		// where: ilike(product.name, '%2%')
	});
	return {
		rows
	};
};

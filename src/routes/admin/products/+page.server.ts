import { db } from '@/server/db';
import { product } from '@/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const rows = await db
		.select({ product_name: product.name, price: product.price, visible: product.visible })
		.from(product);
	return {
		rows
	};
};

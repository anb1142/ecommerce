import type { IImagedProduct } from '@/schemas';
import { db } from '@/server/db';
import { product } from '@/server/db/schema.js';
import { getImagedProduct } from '@/utils/getProducts';
import { error, json } from '@sveltejs/kit';
import { inArray } from 'drizzle-orm';

export async function GET({ url }) {
	if (!url.searchParams.get('ids')) return error(400);
	const ids = url.searchParams.get('ids') as string;
	const productIds = ids.split(',').map(Number);
	console.log(productIds);
	const productsRes = await db
		.select()
		.from(product)
		.where(inArray(product.id, productIds));

	// const productsRes = await db.query.product.findMany({
	// 	where: (product, { eq }) => eq(product.id, true)
	// });
	const products: IImagedProduct[] = [];
	for (const product of productsRes) {
		const pd = product as IImagedProduct;
		products.push(await getImagedProduct(pd));
	}
	return json({
		products
	});
	// return json({ hi: '' });
}

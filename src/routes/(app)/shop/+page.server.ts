import type { IImagedProduct } from '@/schemas';
import { db } from '@/server/db';
import { getImagedProduct } from '@/utils/getProducts';

export async function load() {
	const productsRes = await db.query.product.findMany({
		where: (product, { eq }) => eq(product.visible, true)
	});
	const products: IImagedProduct[] = [];
	for (const product of productsRes) {
		const pd = product as IImagedProduct;
		products.push(await getImagedProduct(pd));
	}
	return {
		products
	};
}

import type { IImagedProduct } from '@/schemas';
import { db } from '@/server/db';
import { getImagedProduct } from '@/utils/getProducts';

export async function load({ params }) {
	const id = Number(params.slug);
	const productsRes = await db.query.product.findFirst({
		where: (product, { eq }) => eq(product.id, id)
	});
	const pd = productsRes as IImagedProduct;
	const product = await getImagedProduct(pd);
	return {
		product
	};
}

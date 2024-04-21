import { getImagedProducts } from '@/utils/getProducts';
import { error, json } from '@sveltejs/kit';

export async function GET({ url }) {
	if (!url.searchParams.get('ids')) return error(400);
	// const ids = url.searchParams.get('ids') as string;
	// const productIds = ids.split(',').map(Number);
	// const productsRes = await db
	// 	.select()
	// 	.from(product)
	// 	.where(inArray(product.id, productIds));

	// const products: IImagedProduct[] = [];
	// for (const product of productsRes) {
	// 	products.push(await getImagedProduct(product.id));
	// }
	const products = await getImagedProducts();

	return json({
		products
	});
}

import { getImagedProduct, getImagedProducts } from '@/utils/getProducts';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const ids = url.searchParams.get('ids');
	let products;
	if (ids)
		if (ids.includes(',')) products = await getImagedProducts();
		else products = await getImagedProduct(Number(ids));
	else products = await getImagedProducts();
	return json({
		products
	});
}

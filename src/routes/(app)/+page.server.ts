import { getImagedProducts } from '@/utils/getProducts';

export async function load({ isDataRequest }) {
	const query = getImagedProducts(4);
	const products = isDataRequest ? query : await query;
	return { products, isDataRequest };
}

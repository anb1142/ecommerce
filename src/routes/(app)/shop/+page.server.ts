import { getImagedProducts } from '@/utils/getProducts';

export async function load({ isDataRequest }) {
	const products = getImagedProducts();
	return { products: isDataRequest ? products : await products };
}

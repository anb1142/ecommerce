import { getImagedProducts } from '@/utils/getProducts';

export async function load({ isDataRequest }) {
	const products = getImagedProducts(4);
	return { products: isDataRequest ? products : await products };
}

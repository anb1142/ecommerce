import { getImagedProducts } from '@/utils/getProducts';

export async function load() {
	const products = getImagedProducts();
	return { products };
}

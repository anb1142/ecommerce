import { getImagedProducts } from '@/utils/getProducts';

export async function load() {
	const allProducts = getImagedProducts();
	return { allProducts };
}

import { getImagedProducts } from '@/utils/getProducts';

export async function load() {
	const products = await getImagedProducts();

	return {
		products
	};
}

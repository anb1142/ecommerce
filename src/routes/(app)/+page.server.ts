import { getImagedProducts } from '@/utils/getProducts';
import { hasInUrl } from '@/utils/hasInUrl.ts';

export async function load({ url }) {
	const query = getImagedProducts(3);
	const products = hasInUrl(url) ? query : await query;
	return { products };
}

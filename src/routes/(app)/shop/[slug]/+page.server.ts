import { getImagedProduct } from '@/utils/getProducts';
import { hasInUrl } from '@/utils/hasInUrl.ts';

export async function load({ params, url }) {
	const query = getImagedProduct(Number(params.slug));
	const product = hasInUrl(url) ? query : await query;
	return { product };
}

import { getImagedProduct } from '@/utils/getProducts';

export async function load({ params }) {
	const id = Number(params.slug);
	const product = await getImagedProduct(id);
	return {
		product
	};
}

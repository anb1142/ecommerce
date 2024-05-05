import { getImagedProduct } from '@/utils/getProducts';

export async function load({ params, isDataRequest }) {
	const product = getImagedProduct(Number(params.slug));
	return { product: isDataRequest ? product : await product };
}

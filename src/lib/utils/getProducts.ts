import type { IImagedProduct } from '@/schemas';
import { db } from '@/server/db';

export const getImagedProduct = async (product: IImagedProduct) => {
	const productImages = await db.query.product_image.findMany({
		where: (product_image, { eq }) => eq(product_image.product_id, product.id)
	});
	product.images = [];
	for (const productImage of productImages) {
		const res = await db.query.image.findMany({
			where: (image, { eq }) => eq(image.id, productImage.image_id)
		});
		product.images.push(res[0]);
	}
	return product;
};

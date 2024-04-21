import type { IImagedProduct } from '@/schemas';
import { db } from '@/server/db';

export const getImagedProduct = async (product: IImagedProduct) => {
	const productImages = await db.query.product_image.findMany({
		where: (product_image, { eq }) => eq(product_image.product_id, product.id)
	});
	product.images = await Promise.all(
		productImages.map(async (productImage) => {
			const res = await db.query.image.findMany({
				where: (image, { eq }) => eq(image.id, productImage.image_id)
			});
			return res[0];
		})
	);

	return product;
};

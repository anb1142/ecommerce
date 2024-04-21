import type { IImagedProduct } from '@/schemas';
import { db } from '@/server/db';
import { product_image, image, product } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export const getImagedProduct = async (id: number) => {
	const rows = await db
		.select()
		.from(product)
		.innerJoin(product_image, eq(product_image.product_id, product.id))
		.innerJoin(image, eq(product_image.image_id, image.id))
		.where(eq(product.id, id));

	const p = rows[0].product as IImagedProduct;
	p.images = [];
	for (const row of rows) {
		if (row.product_image.product_id === p.id) p.images.push(row.image);
	}
	return p;
};
export const getImagedProducts = async (limit = 6) => {
	const query = db
		.select()
		.from(product)
		.limit(limit)
		.innerJoin(product_image, eq(product_image.product_id, product.id))
		.innerJoin(image, eq(product_image.image_id, image.id));
	const rows = await query;
	const imageProduct = (row: (typeof rows)[number]) => {
		const p = row.product as IImagedProduct;
		p.images = [];
		for (const row of rows) {
			if (row.product_image.product_id === p.id) p.images.push(row.image);
		}
		return p;
	};
	const productObj: Record<string, IImagedProduct> = {};
	for (const row of rows) {
		productObj[row.product.id] = imageProduct(row);
	}
	const p = Object.values(productObj);
	return p;
};

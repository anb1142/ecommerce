import type { IImagedProduct } from '@/schemas';
import { db } from '@/server/db';
import { image, product, product_image } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

type IRes = {
	product: typeof product.$inferSelect;
	image: typeof image.$inferSelect;
	product_image: typeof product_image.$inferSelect;
};
const imageProduct = (rows: IRes[], row: IRes) => {
	const p = row.product as IImagedProduct;
	p.images = [];
	for (const row of rows) {
		if (row.product_image.product_id === p.id) p.images.push(row.image);
	}
	return p;
};

export const getImagedProduct = async (id: number) => {
	const rows = await db
		.select()
		.from(product)
		.innerJoin(product_image, eq(product_image.product_id, product.id))
		.innerJoin(image, eq(product_image.image_id, image.id))
		.where(eq(product.id, id));

	const p = imageProduct(rows, rows[0]);
	return p;
};

export const getImagedProducts = async (
	limit: number | undefined = undefined,
	offset: number | undefined = undefined
) => {
	const query = db
		.select()
		.from(product)
		.where(eq(product.visible, true))
		.limit(limit || 0)
		.offset(offset || 0)
		.innerJoin(product_image, eq(product_image.product_id, product.id))
		.innerJoin(image, eq(product_image.image_id, image.id));

	const rows = await query;

	const productObj: Record<string, IImagedProduct> = {};
	for (const row of rows) {
		productObj[row.product.id] = imageProduct(rows, row);
	}
	const p = Object.values(productObj);
	return p;
};

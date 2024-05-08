import type { IImagedProduct } from '@/schemas';
import { db } from '@/server/db';
import { tb_image, tb_product, tb_product_image } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

type IRes = {
	product: typeof tb_product.$inferSelect;
	image: typeof tb_image.$inferSelect;
	product_image: typeof tb_product_image.$inferSelect;
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
		.from(tb_product)
		.innerJoin(tb_product_image, eq(tb_product_image.product_id, tb_product.id))
		.innerJoin(tb_image, eq(tb_product_image.image_id, tb_image.id))
		.where(eq(tb_product.id, id));

	const p = imageProduct(rows, rows[0]);
	return p;
};

export const getImagedProducts = async (
	limit: number | undefined = undefined,
	offset: number | undefined = undefined
) => {
	const query = db
		.select()
		.from(tb_product)
		.where(eq(tb_product.visible, true))
		.limit(limit || 0)
		.offset(offset || 0)
		.innerJoin(tb_product_image, eq(tb_product_image.product_id, tb_product.id))
		.innerJoin(tb_image, eq(tb_product_image.image_id, tb_image.id));

	const rows = await query;

	const productObj: Record<string, IImagedProduct> = {};
	for (const row of rows) {
		productObj[row.product.id] = imageProduct(rows, row);
	}
	const p = Object.values(productObj);
	return p;
};

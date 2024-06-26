import { productFields, type IField } from '@/schemas';
import { db } from '@/server/db';
import { tb_category, tb_image, tb_product, tb_product_image } from '@/server/db/schema';
import { extractFormValues } from '@/utils/extractFormValues';
import { goBack } from '@/utils/redirects.js';
import { eq } from 'drizzle-orm';

const getCategoriesForSelect = async () =>
	await db.select({ value: tb_category.id, label: tb_category.name }).from(tb_category);

const getFields = async () => {
	const categories = {
		name: 'category_id',
		label: 'Category',
		valType: 'number',
		opts: await getCategoriesForSelect()
	} as const satisfies IField;

	const fields = [categories, ...productFields] as const;
	return fields;
};
const getFieldData = async (id: number) => {
	return (
		await db
			.select({
				category_id: tb_product.category_id,
				name: tb_product.name,
				price: tb_product.price,
				visible: tb_product.visible,
				description: tb_product.description
			})
			.from(tb_product)
			.where(eq(tb_product.id, id))
	)[0];
};
const getImages = async () => {
	const query = db
		.select({ id: tb_image.id, alt: tb_image.alt, url: tb_image.url })
		.from(tb_image);
	return await query;
};
type IImage = {
	id: number;
	alt: string;
	url: string;
};
const getProductImages = async (id: number, allImages: IImage[]) => {
	const productImagesRes = await db
		.select()
		.from(tb_product_image)
		.where(eq(tb_product_image.product_id, id));
	return allImages.filter((image) =>
		productImagesRes.some((productImage) => productImage.image_id === image.id)
	);
};

const getValuedFields = async (id: number) => {
	const fields = await getFields();
	const fieldData = await getFieldData(id);
	return fields.map((field) => {
		const fieldName = field.name;
		let newField: typeof field;
		if (field.name === 'category_id' && field.opts) {
			newField = { ...field, value: fieldData[fieldName] };
			newField.opts = field.opts.map((opt) => {
				return { ...opt, selected: opt.value === fieldData.category_id };
			});
			return newField;
		}
		newField = { ...field, value: fieldData[fieldName] };

		return newField;
	});
};

export const load = async ({ url }) => {
	if (!url.searchParams.get('id')) goBack(url);
	const id = Number(url.searchParams.get('id'));

	const valuedFields = await getValuedFields(id);
	const allImages = await getImages();
	const productImages = await getProductImages(id, allImages);
	const addedImageIds = productImages.map((image) => image.id);
	const visible = (
		await db
			.select({ visible: tb_product.visible })
			.from(tb_product)
			.where(eq(tb_product.id, id))
	)[0].visible;
	return {
		fields: valuedFields,
		id,
		allImages,
		productImages,
		addedImageIds,
		visible
	};
};

const setProductImages = async (product_id: number, imageIds: number[]) => {
	const allImages = await getImages();
	const productImages = await getProductImages(Number(product_id), allImages);

	const values = imageIds
		.filter((image_id) => !productImages.some((image) => image.id === image_id))
		.map((image_id) => ({ product_id, image_id }));
	if (values.length > 0) await db.insert(tb_product_image).values(values);
};
export const actions = {
	edit: async ({ request, url }) => {
		const fields = await getFields();
		const formData = await request.formData();
		const data = extractFormValues(fields, formData);
		const id = Number(formData.get('id') as string);
		const addImgs = formData.get('addImgs') as string;
		const imgIds = addImgs.split(',').map(Number);

		await setProductImages(id, imgIds);
		await db.update(tb_product).set(data).where(eq(tb_product.id, id));

		goBack(url);
	},
	setVisible: async ({ request, url }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id') as string);
		const visible = Boolean(Number(formData.get('visibility') as string));
		await db.update(tb_product).set({ visible }).where(eq(tb_product.id, id));
		goBack(url);
	}
};

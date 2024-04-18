import { productFields, type IField } from '@/schemas';
import { db } from '@/server/db';
import { category, product } from '@/server/db/schema';
import { extractFormValues } from '@/utils/extractFormValues';
import { goBack } from '@/utils/redirects.js';
import { eq } from 'drizzle-orm';

const getCategoriesForSelect = async () =>
	await db.select({ value: category.id, label: category.name }).from(category);

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
				category_id: product.category_id,
				name: product.name,
				price: product.price,
				description: product.description
			})
			.from(product)
			.where(eq(product.id, id))
	)[0];
};
export const load = async ({ url }) => {
	const id = url.searchParams.get('id');
	if (!id) goBack(url);
	const fields = await getFields();
	const fieldData = await getFieldData(Number(id));
	console.log(fieldData);
	const valuedFields = fields.map((field) => {
		const fieldName = field.name;
		let newField;
		if (field.name === 'category_id' && field.opts) {
			newField = { ...field, value: fieldData[fieldName] };
			newField.opts = field.opts.map((opt) => {
				return { ...opt, selected: opt.value === fieldData.category_id };
			});
		} else {
			newField = { ...field, value: fieldData[fieldName] };
		}
		return newField;
	});

	return { fields: valuedFields, id: id };
};

export const actions = {
	edit: async ({ request, url }) => {
		const fields = await getFields();
		const formData = await request.formData();
		const data = extractFormValues(fields, formData);
		const id = Number(formData.get('id') as string);
		await db.update(product).set(data).where(eq(product.id, id));
		goBack(url);
	}
};

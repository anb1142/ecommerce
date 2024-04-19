import { productFields, type IField } from '@/schemas';
import { db } from '@/server/db';
import { category, product } from '@/server/db/schema';
import { extractFormValues } from '@/utils/extractFormValues';
import { redirect } from '@sveltejs/kit';

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
export const load = async () => {
	return { fields: await getFields() };
};

export const actions = {
	create: async ({ request }) => {
		const fields = await getFields();
		const formData = await request.formData();
		const data = extractFormValues(fields, formData);
		const { id } = (
			await db.insert(product).values(data).returning({ id: product.id })
		)[0];
		redirect(303, `/admin/product/edit?id=${id}`);
	}
};

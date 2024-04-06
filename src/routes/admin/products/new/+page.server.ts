import { productFields } from '@/schemas';
import { db } from '@/server/db';
import { category, product } from '@/server/db/schema';
import { extractFormValues } from '@/utils/extractFormValues';
import type { Actions } from '@sveltejs/kit';

const getFields = async () => {
	const getCategoriesForSelect = async () =>
		await db.select({ value: category.id, label: category.name }).from(category);

	const fields = [
		{
			name: 'category_id',
			label: 'Category',
			valType: 'number',
			opts: await getCategoriesForSelect()
		},
		...productFields
	] as const;
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
		await db.insert(product).values(data);
	}
} satisfies Actions;

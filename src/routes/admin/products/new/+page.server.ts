import { productFields } from '@/schemas';
import { db } from '@/server/db';
import { category, product } from '@/server/db/schema';
import { extractFormValues } from '@/utils/extractFormValues';
import type { Actions } from '@sveltejs/kit';

const getCategoriesForSelect = async () =>
	await db.select({ value: category.id, text: category.name }).from(category);

const fields = [
	...productFields,
	{
		name: 'category_id',
		label: 'Category',
		valType: 'number',
		opts: await getCategoriesForSelect()
	}
] as const;

export const load = async () => {
	return { fields };
};
export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const data = extractFormValues(fields, formData);

		await db.insert(product).values(data);
	}
} satisfies Actions;

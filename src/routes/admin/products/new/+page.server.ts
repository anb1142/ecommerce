import { productFields } from '@/schemas';
import { db } from '@/server/db';
import { category, product } from '@/server/db/schema';
import { extractFormValues } from '@/utils/extractFormValues';
import type { Actions } from '@sveltejs/kit';

export const load = async () => {
	const getCategoriesForSelect = async () =>
		await db.select({ value: category.id, label: category.name }).from(category);

	const fields = [
		...productFields,
		{
			name: 'category_id',
			label: 'Category',
			valType: 'number',
			opts: await getCategoriesForSelect()
		}
	] as const;

	return { fields };
};

export const actions = {
	create: async ({ request }) => {
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

		const formData = await request.formData();
		const data = extractFormValues(fields, formData);
		await db.insert(product).values(data);
	}
} satisfies Actions;

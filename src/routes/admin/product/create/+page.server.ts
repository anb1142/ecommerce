import { type IField, productFields } from '@/schemas';
import { db } from '@/server/db';
import { category, product } from '@/server/db/schema';
import { extractFormValues } from '@/utils/extractFormValues';
import { goBack } from '@/utils/redirects.js';

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
	create: async ({ request, url }) => {
		const fields = await getFields();
		const formData = await request.formData();
		const data = extractFormValues(fields, formData);
		await db.insert(product).values(data);
		goBack(url);
	}
};

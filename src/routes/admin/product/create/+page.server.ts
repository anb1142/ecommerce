import { productFields, type IField } from '@/schemas';
import { db } from '@/server/db';
import { tb_category, tb_product } from '@/server/db/schema';
import { extractFormValues } from '@/utils/extractFormValues';
import { redirect } from '@sveltejs/kit';

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
export const load = async () => {
	return { fields: await getFields() };
};

export const actions = {
	create: async ({ request }) => {
		const fields = await getFields();
		const formData = await request.formData();
		const data = extractFormValues(fields, formData);
		const { id } = (
			await db.insert(tb_product).values(data).returning({ id: tb_product.id })
		)[0];
		redirect(303, `/admin/product/edit?id=${id}`);
	}
};

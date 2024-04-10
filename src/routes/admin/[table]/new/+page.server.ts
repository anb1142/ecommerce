import { fields } from '@/schemas';
import { db } from '@/server/db';
import { category } from '@/server/db/schema';
import { extractFormValues } from '@/utils/extractFormValues';
import tableIsValid from '@/utils/tableIsValid.js';
import { type Actions, redirect } from '@sveltejs/kit';
export const load = async ({ params }) => {
	const tableName = tableIsValid(params);
	const field = fields[tableName];
	return { fields: field };
};

export const actions = {
	create: async ({ request, params }) => {
		const tableName = tableIsValid(params);
		const formData = await request.formData();
		const field = fields[tableName];

		const data = extractFormValues(field, formData);
		await db.insert(category).values(data);
		redirect(303, `/admin/${tableName}`);
	}
} satisfies Actions;

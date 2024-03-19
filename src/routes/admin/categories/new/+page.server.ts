import { categoryFields } from '@/schemas';
import { db } from '@/server/db';
import { category } from '@/server/db/schema';
import { extractFormValues } from '@/utils/extractFormValues';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const data = extractFormValues(categoryFields, formData);
		await db.insert(category).values(data);
	}
} satisfies Actions;

import { categoryFields } from '@/schemas';
import { db } from '@/server/db';
import { tb_category } from '@/server/db/schema';
import { extractFormValues } from '@/utils/extractFormValues';
import { goBack } from '@/utils/redirects.js';

export const actions = {
	create: async ({ request, url }) => {
		const fields = categoryFields;
		const formData = await request.formData();
		const data = extractFormValues(fields, formData);
		await db.insert(tb_category).values(data);
		goBack(url);
	}
};

import { imageFields } from '@/schemas';
import { extractFormValues } from '@/utils/extractFormValues';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const data = extractFormValues(imageFields, formData);
	}
} satisfies Actions;

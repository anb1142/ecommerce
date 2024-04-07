import { imageFields } from '@/schemas';
import { db } from '@/server/db';
import { uploadMedia } from '@/server/db/mediaDB';
import { image } from '@/server/db/schema';
import { extractFormValues } from '@/utils/extractFormValues';
import { type Actions, redirect } from '@sveltejs/kit';

export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const { url: imageFile, alt } = extractFormValues(imageFields, formData);
		const res = await uploadMedia(imageFile, alt);
		if (res.success) {
			const { secure_url: url } = res.result;
			await db.insert(image).values({ alt, url });
			redirect(302, '/admin/images');
		}
	}
} satisfies Actions;

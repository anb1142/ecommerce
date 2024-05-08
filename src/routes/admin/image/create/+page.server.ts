import { imageFields } from '@/schemas';
import { db } from '@/server/db';
import { uploadMedia } from '@/server/db/mediaDB';
import { tb_image } from '@/server/db/schema';
import { extractFormValues } from '@/utils/extractFormValues';
import { goBack } from '@/utils/redirects';

export const actions = {
	create: async ({ request, url }) => {
		const formData = await request.formData();
		const { url: imageFile, alt } = extractFormValues(imageFields, formData);
		const res = await uploadMedia(imageFile, alt);
		if (res.success) {
			const { secure_url: url } = res.result;
			await db.insert(tb_image).values({ alt, url });
		}
		goBack(url);
	}
};

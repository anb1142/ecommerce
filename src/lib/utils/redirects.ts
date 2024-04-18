import { redirect } from '@sveltejs/kit';

export const goBack = (url: URL) => {
	redirect(303, url.pathname.split('/').slice(0, -1).join('/'));
};

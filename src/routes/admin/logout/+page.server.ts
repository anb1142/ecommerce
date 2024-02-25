import { redirect } from '@sveltejs/kit';

export const load = ({ cookies }) => {
	cookies.delete('admin', { path: '/' });
	redirect(302, '/');
};

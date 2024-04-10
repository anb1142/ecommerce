import { tables, type ITables } from '@/server/db/schema';
import { redirect } from '@sveltejs/kit';

const tableIsValid = (params: Partial<Record<string, string>>) => {
	if (!params.table || !Object.keys(tables).includes(params.table))
		redirect(303, '/admin/');
	return params.table as ITables;
};
export default tableIsValid;

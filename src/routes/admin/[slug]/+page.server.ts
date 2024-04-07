import { cols, fields } from '@/schemas';
import { db } from '@/server/db';
import { type ITables, tables } from '@/server/db/schema';
import selectTable from '@/utils/selectTable';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const tableName = params.slug as ITables;
	if (!Object.keys(tables).includes(tableName)) redirect(303, '/admin/');

	// const tableName = 'category';
	const table = selectTable(tableName);
	const select = {};
	if (table.id) select.id = table.id;
	for (const col of fields[tableName]) {
		const name = col.name;
		select[name] = table[name];
	}
	console.log(table);
	const rows = await db.select(select).from(table);
	const ths = cols[tableName];
	return { rows, ths };
}) satisfies PageServerLoad;

import { cols, fields } from '@/schemas';
import { db } from '@/server/db';
import { type ITables, tables } from '@/server/db/schema';
import selectTable, { type ISelectedTable } from '@/utils/selectTable';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const selectTableColumns = <
	TTableName extends ITables,
	TTable extends ISelectedTable<TTableName>
>(
	tableName: TTableName,
	table: TTable
) => {
	type ISelect = typeof table.$inferSelect;
	type IColumn<T extends keyof ISelect> = TTable[T];
	const columns = {} as Record<keyof TTable, IColumn<keyof ISelect>>;
	const tableFields = fields[tableName];
	if (table.id) columns.id = table.id;
	for (const col of tableFields) {
		const name = col.name as keyof ISelect;
		columns[name] = table[name];
	}
	return columns;
};

export const load = (async ({ params }) => {
	const tableName = params.slug as ITables;
	if (!Object.keys(tables).includes(tableName)) redirect(303, '/admin/');

	const table = selectTable(tableName);
	const columns = selectTableColumns(tableName, table);

	const rows = await db.select(columns).from(table);
	const ths = cols[tableName];

	return { rows, ths };
}) satisfies PageServerLoad;

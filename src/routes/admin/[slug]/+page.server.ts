import { cols, fields } from '@/schemas';
import { db } from '@/server/db';
import { type ITables, tables } from '@/server/db/schema';
import selectTable, { type ISelectedTable } from '@/utils/selectTable';
import { redirect } from '@sveltejs/kit';
import { asc, count, desc } from 'drizzle-orm';

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

export const load = async ({ params, url }) => {
	const tableName = params.slug as ITables;
	if (!Object.keys(tables).includes(tableName)) redirect(303, '/admin/');

	const table = selectTable(tableName);
	const columns = selectTableColumns(tableName, table);

	const orderBy = (url.searchParams.get('orderBy') ||
		'id') as keyof typeof table.$inferSelect;
	const order = (url.searchParams.get('order') || 'asc') as 'asc' | 'desc';
	const limit = (url.searchParams.get('limit') || 15) as number;
	const offset = (url.searchParams.get('offset') || 0) as number;

	const getRowCount = async () => {
		const res = await db.select({ count: count() }).from(table);
		return res[0].count;
	};

	const getRows = async () =>
		await db
			.select(columns)
			.from(table)
			.limit(limit)
			.offset(offset)
			.orderBy(order === 'desc' ? desc(table[orderBy]) : asc(table[orderBy]));

	const ths = cols[tableName];

	return { rows: await getRows(), rowCount: await getRowCount(), ths, now: Date.now() };
};

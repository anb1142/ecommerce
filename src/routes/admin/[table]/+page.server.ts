import { cols } from '@/schemas';
import { db } from '@/server/db';
import type { ITables } from '@/server/db/schema.js';
import selectTable, { type ISelectTableByName } from '@/utils/selectTable';
import tableIsValid from '@/utils/tableIsValid.js';
import { asc, count, desc } from 'drizzle-orm';

const selectTableColumns = <
	TTableName extends ITables,
	TTable extends ISelectTableByName<TTableName>
>(
	tableName: TTableName,
	table: TTable
) => {
	type ISelect = typeof table.$inferSelect;
	type IColumn<T extends keyof ISelect> = TTable[T];
	const tableCols = cols[tableName];
	const columns = {} as Record<keyof TTable, IColumn<keyof ISelect>>;
	if (table.id) columns.id = table.id;
	for (const col of tableCols) {
		const name = col.name as keyof ISelect;
		columns[name] = table[name];
	}

	return columns;
};

export const load = async ({ params, url }) => {
	const tableName = tableIsValid(params);
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

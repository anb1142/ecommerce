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
	const perPage = 15;
	const tableName = tableIsValid(params);
	const table = selectTable(tableName);
	const columns = selectTableColumns(tableName, table);
	const getParams = () => {
		type ITableOrder = null | 'desc';
		const page = (url.searchParams.get('page') || 1) as number;
		const limit = (url.searchParams.get('perPage') || perPage) as number;
		const offset = (page - 1) * limit;
		const orderBy = (url.searchParams.get('orderBy') ||
			'id') as keyof typeof table.$inferSelect;
		const order = url.searchParams.get('order') as ITableOrder;

		return { orderBy, order, limit, offset };
	};

	const tableParams = getParams();

	const getRowCount = async () => {
		const res = await db.select({ count: count() }).from(table);
		return res[0].count;
	};
	const getRows = async () => {
		const orderBy = table[tableParams.orderBy];
		const query = db
			.select(columns)
			.from(table)
			.limit(tableParams.limit)
			.offset(tableParams.offset)
			.orderBy(tableParams.order === 'desc' ? desc(orderBy) : asc(orderBy));
		return await query;
	};

	const ths = cols[tableName];

	return {
		tableParams: getParams(),
		rows: await getRows(),
		rowCount: await getRowCount(),
		ths,
		perPage
	};
};

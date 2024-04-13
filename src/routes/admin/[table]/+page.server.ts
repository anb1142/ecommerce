import { cols } from '@/schemas';
import { db } from '@/server/db';
import type { ITableName } from '@/server/db/schema.js';
import { getTableFilterParams } from '@/utils/getTableFilterParams.js';
import selectTable, { type ISelectTableByName } from '@/utils/selectTable';
import tableIsValid from '@/utils/tableIsValid.js';
import { asc, count, desc } from 'drizzle-orm';

const selectTableColumns = <
	TTableName extends ITableName,
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
	const tableParams = getTableFilterParams(url, perPage, table);
	const offset = (tableParams.page - 1) * tableParams.limit;

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
			.offset(offset)
			.orderBy(tableParams.order === 'desc' ? desc(orderBy) : asc(orderBy));
		return await query;
	};

	const ths = cols[tableName];

	return {
		tableParams,
		rows: await getRows(),
		totalRows: await getRowCount(),
		ths
	};
};

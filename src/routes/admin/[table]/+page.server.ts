import { cols } from '@/schemas';
import { db } from '@/server/db';
import { getTableFilterParams } from '@/utils/getTableFilterParams.js';
import { selectTable, selectTableColumns } from '@/utils/selectTable';
import tableIsValid from '@/utils/tableIsValid.js';
import { asc, count, desc } from 'drizzle-orm';

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

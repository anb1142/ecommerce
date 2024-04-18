import { type ITableName, tables } from '@/server/db/schema';
import { fields, cols } from '@/schemas';
import type { InferSelectModel } from 'drizzle-orm';

export type ISelectTableByName<TableName extends ITableName> = (typeof tables)[TableName];
export type ISelectColumns<TTable extends ISelectTableByName<ITableName>> =
	InferSelectModel<TTable>;

export const selectTable = <TTableName extends ITableName>(tableName: TTableName) => {
	const table = tables[tableName] as ISelectTableByName<TTableName>;
	return table;
};

export const selectTableColumns = <
	TTableName extends ITableName,
	TTable extends ISelectTableByName<TTableName>
>(
	tableName: TTableName,
	table: TTable,
	fromFields = false
) => {
	type ISelect = typeof table.$inferSelect;
	type IColumn<T extends keyof ISelect> = TTable[T];
	const tableCols = fromFields ? fields[tableName] : cols[tableName];
	const columns = {} as Record<keyof TTable, IColumn<keyof ISelect>>;
	if (table.id && !fromFields) columns.id = table.id;
	for (const col of tableCols) {
		const name = col.name as keyof ISelect;
		columns[name] = table[name];
	}

	return columns;
};

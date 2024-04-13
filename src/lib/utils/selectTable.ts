import { type ITableName, tables } from '@/server/db/schema';

export type ISelectTableByName<TableName extends ITableName> = (typeof tables)[TableName];

const selectTable = <TTableName extends ITableName>(tableName: TTableName) => {
	const table = tables[tableName] as ISelectTableByName<TTableName>;
	return table;
};
export default selectTable;

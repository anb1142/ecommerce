import { type ITables, tables } from '@/server/db/schema';

export type ISelectTableByName<TableName extends ITables> = (typeof tables)[TableName];

const selectTable = <TTableName extends ITables>(tableName: TTableName) => {
	const table = tables[tableName] as ISelectTableByName<TTableName>;
	return table;
};
export default selectTable;

import { type ITables, tables } from '@/server/db/schema';

export type ISelectableTables<T extends ITables> = (typeof tables)[T];
export type ISelectedTable<T extends ITables> = ISelectableTables<T>;

const selectTable = <TTables extends ITables>(tableName: TTables) => {
	const table = tables[tableName] as ISelectedTable<TTables>;
	return table;
};
export default selectTable;

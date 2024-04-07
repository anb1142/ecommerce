import { type ITables, tables } from '@/server/db/schema';

type ISelectableTables<T extends keyof typeof tables> = (typeof tables)[T];
const selectTable = <TTables extends ITables>(tableName: TTables) => {
	type ISelectedTable = ISelectableTables<typeof tableName>;

	const table = tables[tableName] as ISelectedTable;
	return table;
};
export default selectTable;

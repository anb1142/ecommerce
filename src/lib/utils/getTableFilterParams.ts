import type { ITableName } from '@/server/db/schema';
import type { ISelectTableByName } from './selectTable';

export type ITableOrder = null | 'desc';

export const getTableFilterParams = <TTable extends ISelectTableByName<ITableName>>(
	url: URL,
	perPage: number,
	table: TTable
) => {
	const page = Number(url.searchParams.get('page') || 1);
	const limit = Number(url.searchParams.get('perPage') || perPage);
	const orderBy = (url.searchParams.get('orderBy') ||
		'id') as keyof typeof table.$inferSelect;
	const order = url.searchParams.get('order') as ITableOrder;

	return { orderBy, order, limit, page };
};
export const getDefaultTableParams = (tableParams: ITableFilterParams) => {
	const { orderBy } = tableParams;
	const order = !tableParams.order ? undefined : tableParams.order;
	return { orderBy, order };
};
export type ITableFilterParams = ReturnType<typeof getTableFilterParams>;

import type { ITables } from '@/server/db/schema';
import type { ISelectTableByName } from '@/utils/selectTable';
export type optType = {
	value: string | number;
	label: string;
};

type ICol<TTableCols> = { name: keyof TTableCols; label: string };
type ICols<TTableCols> = Array<ICol<TTableCols>>;
type ITableCols<TTableName extends ITables> = ICols<ISelectTableByName<TTableName>>;

export type IField = {
	name: string;
	label?: string;
	type?: 'string' | 'number' | 'boolean' | 'file' | 'area';
	required?: boolean;
	value?: string | number;
	opts?: optType[];
	valType?: 'number' | 'string';
};

export type IFields = readonly IField[];

export const productFields = [
	{ name: 'name', label: 'Product Name' },
	{ name: 'price', type: 'number' },
	{ name: 'description', type: 'area' }
] as const;

export const categoryFields = [
	{ name: 'name', label: 'Category Name' }
	// { name: 'parent_category_id', type: 'options', label: 'Parent Category', required: false },
] as const;

export const imageFields = [
	{ name: 'alt', label: 'Caption' },
	{ name: 'url', label: 'Image', type: 'file' }
] as const;

export const productCols = [
	{ name: 'id', label: 'Product ID' },
	{ name: 'name', label: 'Product Name' },
	{ name: 'price', label: 'Price' },
	{ name: 'visible', label: 'Visible' }
] as const satisfies ITableCols<'product'>;

export const categoryCols = [
	{ name: 'id', label: 'Category ID' },
	{ name: 'name', label: 'Category Name' }
	// { name: 'parent_category_id', label: 'Parent Category' },
] as const satisfies ITableCols<'category'>;

export const imageCols = [
	{ name: 'id', label: 'Image ID' },

	{ name: 'alt', label: 'Caption' },
	{ name: 'url', label: 'Image' }
] as const satisfies ITableCols<'image'>;

export const fields = {
	category: categoryFields,
	product: productFields,
	image: imageFields,
	product_image: imageFields
};
export const cols = {
	category: categoryCols,
	product: productCols,
	image: imageCols,
	product_image: imageCols
};

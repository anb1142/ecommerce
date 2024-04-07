import toTitleCase from '@/utils/totitleCase';
export type optType = {
	value: string | number;
	label: string;
};
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

const fieldsToCols = (fields: IFields, id = true) => {
	const rows = [];
	if (id) rows.push({ name: 'id', label: 'ID' });
	rows.push(
		...fields.map((field: IField) => ({
			name: field.name,
			label: field.label ? field.label : toTitleCase(field.name)
		}))
	);
	return rows;
};

const removeCols = (fields: IFields, cols: string[]) => {
	return fields.filter((col) => !cols.includes(col.name));
};

export const productFields = [
	{ name: 'name', label: 'Product Name' },
	{ name: 'price', type: 'number' },
	{ name: 'description', type: 'area' },
	{ name: 'visible', type: 'boolean' }
] as const;

export const categoryFields = [
	{ name: 'name', label: 'Category Name' }
	// { name: 'parent_category_id', type: 'options', label: 'Parent Category', required: false },
] as const;

export const imageFields = [
	{ name: 'alt', label: 'Caption' },
	{ name: 'url', label: 'Image', type: 'file' }
] as const;

export const categoryCols = fieldsToCols(categoryFields);
export const productCols = removeCols(fieldsToCols(productFields), ['description']);
export const imageCols = fieldsToCols(imageFields);

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

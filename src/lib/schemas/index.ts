import toTitleCase from '@/utils/totitleCase';

export type IField = {
	name: string;
	label?: string;
	type?: string;
	required?: boolean;
	value?: string | number;
	options?: string[];
	valType?: 'number' | 'string';
};

export type IFields = readonly IField[];

const fieldsToCols = (fields: IFields, id = true) => {
	const rows = [];
	if (id) rows.push('ID');
	rows.push(
		...fields.map((field: IField) => (field.label ? field.label : toTitleCase(field.name)))
	);
	return rows;
};

const removeCols = (arr: string[], cols: string[]) => {
	return arr.filter((col) => !cols.includes(col));
};

export const productFields = [
	{ name: 'name' },
	{ name: 'price', type: 'text' },
	{ name: 'description', type: 'area' },
	{ name: 'visible', type: 'boolean' }
] as const;

export const categoryFields = [
	{ name: 'name' }
	// { name: 'parent_category_id', type: 'options', label: 'Parent Category', required: false },
] as const;

export const imageFields = [{ name: 'caption' }, { name: 'url', label: 'Link' }] as const;

export const categoryCols = fieldsToCols(categoryFields);
export const productCols = removeCols(fieldsToCols(productFields), ['Description']);
export const imageCols = fieldsToCols(imageFields);

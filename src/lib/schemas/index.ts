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
export const productCols = removeCols(fieldsToCols(productFields), ['description']);
export const imageCols = fieldsToCols(imageFields);

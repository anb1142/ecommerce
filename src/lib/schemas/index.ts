export type IField = {
	name: string;
	label?: string;
	type?: string;
	required?: boolean;
	value?: string | number;
	options?: string[];
};

export type IFields = readonly IField[];

export const productFields = [
	{ name: 'name' },
	{ name: 'price', type: 'number' },
	{ name: 'descrption', type: 'area' }
	// { name: 'visible', type: 'boolean' }
] as const;

export const categoryFields = [
	{ name: 'name' }
	// { name: 'parent_category_id', type: 'options', label: 'Parent Category', required: false },
] as const;

export const mediaFields = [{ name: 'caption' }, { name: 'url', label: 'Link' }] as const;

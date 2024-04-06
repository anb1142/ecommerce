import type { IFields } from '@/schemas';

const extractFormValues: <const TFields extends IFields>(
	fields: TFields,
	formData: FormData
) => {
	[Key in TFields[number]['name']]: Extract<TFields[number], { name: Key }>['type'] extends 'file'
		? File
		: Extract<TFields[number], { name: Key }>['type'] extends 'boolean'
			? boolean
			: Extract<TFields[number], { name: Key }>['valType'] extends 'number'
				? number
				: string;
} = (fields, formData: FormData) => {
	const data: any = {};
	for (const field of fields) {
		if (field.type === 'file') {
			data[field.name] = formData.get(field.name) as File;
			continue;
		}
		const value = formData.get(field.name) as string;
		if (field.type === 'boolean') data[field.name] = value === 'true' ? true : false;
		if (field.valType === 'number') data[field.name] = Number(value);
		else data[field.name] = value;
	}
	return data;
};

export { extractFormValues };

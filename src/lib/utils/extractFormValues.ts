import type { IFields } from '@/schemas';

const extractFormValues: <const TFields extends IFields>(
	fields: TFields,
	formData: FormData
) => {
	[Key in TFields[number]['name']]: Extract<
		TFields[number],
		{ name: Key }
	>['valType'] extends 'number'
		? number
		: string;
} = (fields, formData: FormData) => {
	const data: any = {};
	for (const field of fields) {
		const value = formData.get(field.name) as string;
		if (field.valType === 'number') data[field.name] = Number(value);
		else data[field.name] = value;
	}
	return data;
};

export { extractFormValues };

import type { IFields } from '@/schemas';

type IExtractedFormValues<TFields extends IFields> = {
	[Key in TFields[number]['name']]: TFields[number]['type'] extends 'file'
		? File
		: TFields[number]['type'] extends 'boolean'
			? boolean
			: TFields[number]['valType'] extends 'number'
				? number
				: string;
};

const extractFormValues = <const TFields extends IFields>(
	fields: TFields,
	formData: FormData
): IExtractedFormValues<TFields> => {
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

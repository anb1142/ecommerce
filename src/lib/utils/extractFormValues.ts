export type IField = {
	name: string;
	label?: string;
	type?: string;
	required?: boolean;
	value?: string | number;
	options?: string[];
};

export type IFields = Record<string, IField>;

const extractFormValues = <TFields extends IFields>(fields: TFields, formData: FormData) => {
	const keys = Object.keys(fields);
	const data = {} as {
		[Key in keyof TFields]: TFields[Key]['type'] extends 'number' ? number : string;
	};
	for (const key of keys) {
		const value = formData.get(key) as string;
		if (fields[key]?.type === 'number') {
			data[key] = Number(value);
		} else {
			data[key] = value;
		}
	}
	return data;
};
// const fieldArrtoObj = <TFields extends IField[]>(fields: IField[]) => {
// 	const fieldObj = {} as { [k: TFields[number]['name']]: IField };
// 	for (const field of fields) {
// 		fieldObj[field.name] = field;
// 	}
// 	return fieldObj;
// };
// const fields = [{ name: 'name' }, { name: 'age', type: 'number' }];
// const formData = new FormData();
// formData.append('name', 'JohnDoe');
// formData.append('age', '25');
// const data = extractFormValues(fields, formData);
//      ^?
export { extractFormValues };

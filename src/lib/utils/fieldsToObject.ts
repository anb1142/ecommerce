export type IField = {
	name?: string;
	label?: string;
	type?: string;
	required?: boolean;
	value?: string | number;
	options?: string[];
};

export type IFields = Record<string, IField>;

const formDataToObj = <TFields extends IFields>(fields: TFields, formData: FormData) => {
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

// const fields = { name: {}, age: { type: 'number' } };
// const formData = new FormData();
// formData.append('name', 'JohnDoe');
// formData.append('age', '25');
// const data = formDataToObj(fields, formData);

export default formDataToObj;

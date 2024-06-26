import * as qs from 'qs';
import { page } from '$app/stores';

type IParamsObj = Record<string, string | number | undefined>;

const getCurrentParams = () => {
	let obj = {};
	const unsubscribe = page.subscribe((page) => {
		const searchParams = page.url.searchParams;
		for (const [key, value] of Object.entries(obj)) {
			if (value === undefined || null) searchParams.delete(key);
			else searchParams.set(key, String(value));
		}
		obj = Object.fromEntries(searchParams);
	});
	unsubscribe();
	return obj;
};
const getCurrentPath = () => {
	let path;
	const unsubscribe = page.subscribe((page) => {
		const url = page.url;
		path = url.origin + url.pathname;
	});
	unsubscribe();
	return path;
};

export const objToParams = (data: IParamsObj) => {
	const current = getCurrentParams();
	const newParams = qs.stringify({ ...current, ...data });
	if (newParams === '') return '';
	return `?${newParams}`;
};
export const urlObjToParams = (data: IParamsObj) => {
	objToParams(data);
	return `${getCurrentPath()}${objToParams(data)}`;
};

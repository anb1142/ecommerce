import { goto } from '$app/navigation';
import { page } from '$app/stores';

type IParamsObj = Record<string, string | number | undefined>;

export const objToParams = (obj: IParamsObj) => {
	let params = '';
	const unsubscribe = page.subscribe((page) => {
		const searchParams = page.url.searchParams;
		for (const [key, value] of Object.entries(obj)) {
			if (value === undefined || null) searchParams.delete(key);
			else searchParams.set(key, String(value));
		}
		params = `?${searchParams.toString()}`;
	});
	unsubscribe();

	return params;
};

export const setSearchParams = (obj: IParamsObj) => {
	const params = objToParams(obj);
	goto(params);
	return params;
};

import { goto } from '$app/navigation';
import { urlObjToParams } from './objToParams';

export const hasInUrl = (url: URL) => {
	return url.searchParams.get('has');
};

export const removeHas = () => {
	const url = urlObjToParams({ has: undefined });
	goto(url, { replaceState: true });
};

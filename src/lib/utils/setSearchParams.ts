import { goto } from '$app/navigation';
import { page } from '$app/stores';

export const setSearchParams = (obj: Record<string, string | number | undefined>) => {
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
	goto(params);
	return params;
};

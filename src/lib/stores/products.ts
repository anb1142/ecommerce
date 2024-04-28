import type { IImagedProduct } from '@/schemas';
import { writable } from 'svelte/store';

export const productStore = writable<Record<string, IImagedProduct>>({});

const url = '/api/products';
async function fetchProducts(ids: number[] = []) {
	const res = await fetch(ids.length < 1 ? url : `${url}?ids=${ids.toString()}`);
	const data = await res.json();
	if (res.ok) return data.products as IImagedProduct[];
	else throw new Error(data);
}

export async function getProducts(ids: number[] | number = []) {
	const newProducts = await fetchProducts(Array.isArray(ids) ? ids : [ids]);
	setProducts(newProducts);
}

export async function setProducts(newProducts: IImagedProduct[] | IImagedProduct) {
	if (Array.isArray(newProducts)) {
		const productObj: Record<number, IImagedProduct> = {};
		for (const product of newProducts) productObj[product.id] = product;
		productStore.set(productObj);
		return;
	}
	productStore.update((productObj) => {
		productObj[newProducts.id] = newProducts;
		return productObj;
	});
}
export async function updateProducts(newProducts: IImagedProduct[] | IImagedProduct) {
	productStore.update((productObj) => {
		if (!Array.isArray(newProducts)) productObj[newProducts.id] = newProducts;
		else for (const product of newProducts) productObj[product.id] = product;

		return productObj;
	});
	return;
}

import type { IImagedProduct } from '@/schemas';
import { derived, writable } from 'svelte/store';

export const productStore = writable<Record<string, IImagedProduct>>({});

export const productList = derived(productStore, ($productStore) =>
	Object.values($productStore)
);

type INewProductRes = IImagedProduct[] | IImagedProduct;
type INewProducts = Promise<INewProductRes> | INewProductRes;

export async function setProducts(newProducts: INewProducts) {
	newProducts = await newProducts;
	if (!Array.isArray(newProducts)) return updateProducts(newProducts);

	const productObj: Record<number, IImagedProduct> = {};
	for (const product of newProducts) productObj[product.id] = product;
	productStore.set(productObj);
}
export async function updateProducts(newProducts: INewProducts) {
	newProducts = await newProducts;
	productStore.update((productObj) => {
		if (!Array.isArray(newProducts)) {
			productObj[newProducts.id] = newProducts;
		} else {
			for (const product of newProducts) productObj[product.id] = product;
		}
		return productObj;
	});
}

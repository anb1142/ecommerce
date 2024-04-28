<script lang="ts">
	import { page } from '$app/stores';
	import Meta from '@/components/Meta.svelte';
	import ProductPage from '@/components/shop/ProductPage.svelte';
	import type { IImagedProduct } from '@/schemas';
	import { productStore, updateProducts } from '@/stores/products.ts';
	import { removeHas } from '@/utils/hasInUrl.ts';
	import { isPromise } from '@/utils/isPromise.ts';
	import { onMount } from 'svelte';

	export let data;
	onMount(async () => {
		removeHas();
		updateProducts(await data.product);
		product = $productStore[$page.params.slug];
	});

	if (!isPromise(data.product)) updateProducts(data.product as IImagedProduct);
	let product: IImagedProduct = $productStore[$page.params.slug];
</script>

{#if product}
	<Meta title={product.name} />
	<ProductPage {product} />
{/if}

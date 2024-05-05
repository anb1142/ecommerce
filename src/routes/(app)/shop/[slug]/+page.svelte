<script lang="ts">
	import ProductPage from '@/components/shop/ProductPage.svelte';
	import { updateProducts } from '@/stores/products.ts';
	export let data;

	updateProducts(data.product);
</script>

{#await data.product}
	<ProductPage />
{:then product}
	<ProductPage {product} />
{/await}

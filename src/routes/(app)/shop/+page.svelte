<script>
	import Meta from '@/components/Meta.svelte';
	import ShopCards from '@/components/shop/ShopCards.svelte';
	import { setProducts } from '@/stores/products.ts';
	export let data;

	setProducts(data.products);
</script>

<Meta title="Products" />
<h1>Products</h1>
{#await data.products}
	<ShopCards />
{:then products}
	<ShopCards {products} />
{/await}

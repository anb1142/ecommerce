<script>
	import Meta from '@/components/Meta.svelte';
	import ShopCards from '@/components/shop/ShopCards.svelte';
	import { productStore, setProducts } from '@/stores/products.ts';
	import { onMount } from 'svelte';
	export let data;
	onMount(async () => {
		setProducts(await data.products);
	});
	$: products = Object.values($productStore);
</script>

<Meta title="Products" />
<h1 class="lg:pt-6">Products</h1>
<ShopCards {products} />

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
<h1 class="ml-[4vw] mt-3 lg:mb-2 lg:ml-[7vw]">Products</h1>
<ShopCards {products} />

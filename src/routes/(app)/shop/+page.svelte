<script>
	import Meta from '@/components/Meta.svelte';
	import ShopCards from '@/components/shop/ShopCards.svelte';
	export let data;
</script>

<Meta title="Products" />
<h1>Products</h1>
<ShopCards newProducts={data.products} />

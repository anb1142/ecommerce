<script>
	import Meta from '@/components/Meta.svelte';
	import ShopCards from '@/components/shop/ShopCards.svelte';
	export let data;
</script>

<Meta title="Products" />
<h1 class="ml-[4vw] mt-3 lg:mb-2 lg:ml-[7vw]">Products</h1>
<ShopCards {...data} />

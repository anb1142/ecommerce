<script>
	import Meta from '@/components/Meta.svelte';
	import ShopCards from '@/components/shop/ShopCards.svelte';
	export let data;
	console.log(data);
</script>

<Meta title="Products" />
<ShopCards {...data} />

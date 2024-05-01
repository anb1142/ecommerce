<script lang="ts">
	import Meta from '@/components/Meta.svelte';
	import Cart from '@/components/shop/Cart/Cart.svelte';
	import { updateProducts } from '@/stores/products.js';
	import { onMount } from 'svelte';

	export let data;
	let loaded = false;
	onMount(async () => {
		updateProducts(await data.allProducts);
		loaded = true;
	});
</script>

<Meta title="Cart" />
<section><Cart bind:loaded /></section>

<style lang="scss">
	section {
		@apply px-0 lg:px-[10vw];
	}
</style>

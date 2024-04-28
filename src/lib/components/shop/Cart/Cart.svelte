<script lang="ts">
	import { productStore, getProducts } from '@/stores/products';
	import { getCart, type ICartState } from '@/utils/cart.ts';
	import { onMount } from 'svelte';
	import CartCheckout from './CartCheckout.svelte';
	import CartProducts from './CartProducts.svelte';

	let cart: ICartState = {};
	let loaded = false;

	$: products = Object.values($productStore).filter(({ id }) => id in cart);
	onMount(async () => {
		cart = getCart();
		const ids = Object.keys(cart).map(Number);
		await getProducts(ids);
		loaded = true;
	});
</script>

<section class="cart">
	{#if products.length > 0}
		<CartProducts bind:products bind:cart />
		<CartCheckout bind:products bind:cart />
	{:else}
		<h1>{loaded ? 'Cart is empty' : 'Loading...'}</h1>
	{/if}
</section>

<style lang="scss">
	.cart {
		@apply relative  flex flex-col justify-center gap-4 p-4 px-[1vw] lg:flex-row lg:px-[10vw];
		> h1 {
			@apply fixed left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center;
		}
	}
</style>

<script lang="ts">
	import type { IImagedProduct } from '@/schemas';

	import { getCart, type ICartState } from '@/utils/cart.ts';
	import { onMount } from 'svelte';
	import CartCheckout from './CartCheckout.svelte';
	import CartProducts from './CartProducts.svelte';

	const fetchCart = async (cart: ICartState) => {
		const keys = Object.keys(cart).toString();
		const res = await fetch('api/cart?ids=' + keys);
		const data = await res.json();
		return data.products;
	};
	let productData: IImagedProduct[] = [];
	let cart: ICartState = {};
	let loaded = false;

	$: products = productData.filter(({ id }) => id in cart);

	onMount(async () => {
		cart = getCart();
		if (Object.keys(cart).length === 0) {
			loaded = true;
			return;
		}
		productData = await fetchCart(cart);
		loaded = true;
	});
</script>

<section class="cart" class:empty={products.length === 0}>
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

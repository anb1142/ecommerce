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
	$: products = productData.filter(({ id }) => id in cart);

	onMount(async () => {
		cart = getCart();
		productData = await fetchCart(cart);
	});
</script>

<section class="cart">
	<CartProducts bind:products bind:cart />
	<CartCheckout bind:products bind:cart />
</section>

<style lang="scss">
	.cart {
		@apply relative  flex justify-center gap-4 p-4;
		padding-inline: 10vw;
	}
	@media screen and (max-width: 768px) {
		.cart {
			@apply flex-col;
			padding-inline: 1vw;
		}
	}
</style>

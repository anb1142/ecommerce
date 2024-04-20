<script lang="ts">
	import Meta from '@/components/Meta.svelte';
	import Cart from '@/components/shop/Cart/Cart.svelte';
	import type { IImagedProduct } from '@/schemas';

	import { getCart, type ICartState } from '@/utils/cart.ts';
	import { onMount } from 'svelte';

	const fetchCart = async (cart: ICartState) => {
		const keys = Object.keys(cart).toString();
		const res = await fetch('api/cart?ids=' + keys);
		const data = await res.json();
		return data.products;
	};
	let products: IImagedProduct[] = [];
	let total = 0;
	let cart: ICartState = {};
	onMount(async () => {
		cart = getCart();
		products = await fetchCart(cart);
		total = products.reduce(
			(acc, curr) => acc + Number(curr.price) * cart[curr.id].quantity,
			0
		);
	});
</script>

<Meta title="Cart" />
<Cart />

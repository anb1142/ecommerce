<script lang="ts">
	import Button from '@/components/ui/button/button.svelte';
	import { ShoppingCart } from 'lucide-svelte';
	import { addToCart, getCart, removeFromCart, type ICartState } from '@/utils/cart';
	import { onMount } from 'svelte';
	export let id: number;
	export let type: '-' | '+' | undefined = undefined;
	let cart: ICartState = {};

	const handleClick = () => {
		if (type === '-') removeFromCart(Number(id));
		else addToCart(Number(id));
		cart = getCart();
	};
	onMount(() => {
		cart = getCart();
	});
</script>

<Button class="flex gap-4 " on:click={handleClick}>
	{#if type}
		{type}
	{:else}
		<ShoppingCart size="20" /> Add to Cart {cart[id] ? `(${cart[id].quantity})` : ''}
	{/if}
</Button>

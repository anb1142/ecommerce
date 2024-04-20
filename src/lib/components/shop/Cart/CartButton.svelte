<script lang="ts">
	import Button from '@/components/ui/button/button.svelte';
	import { ShoppingCart } from 'lucide-svelte';
	import { addToCart, getCart, removeFromCart } from '@/utils/cart';
	export let id: string | number;
	export let type: '-' | '+' | undefined = undefined;
	const handleClick = () => {
		if (type === '-') removeFromCart(String(id));
		else addToCart(String(id));
		cart = getCart();
	};
	let cart = getCart();
</script>

<Button class="flex gap-4 " on:click={handleClick}>
	{#if type}
		{type}
	{:else}
		<ShoppingCart size="20" /> Add to Cart {cart[id] ? `(${cart[id].quantity})` : ''}
	{/if}
</Button>

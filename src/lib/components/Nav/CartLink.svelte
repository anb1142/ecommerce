<script>
	import { getCart } from '@/utils/cart';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { ShoppingCart } from 'lucide-svelte';

	let cartCount = 0;
	$: pathname = $page.url.pathname;

	onMount(() => {
		const cartTimer = setInterval(() => {
			cartCount = Object.values(getCart()).reduce((acc, curr) => acc + curr.quantity, 0);
		}, 100);
		return () => clearInterval(cartTimer);
	});
</script>

<a href="/cart" class:active={pathname === '/cart'}>
	<ShoppingCart size="20" />
	<span class:hide={!cartCount}>{cartCount}</span>
</a>

<style lang="scss">
	a {
		@apply relative z-0;
		> span {
			@apply absolute -right-3 -top-1 rounded-full bg-primary px-1 text-xs font-bold text-white transition-opacity;
			&.hide {
				@apply opacity-0;
			}
		}
	}
</style>

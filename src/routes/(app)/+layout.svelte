<script>
	import { page } from '$app/stores';
	import ViewTransition from '@/components/ViewTransition.svelte';
	import { getCart } from '@/utils/cart';
	import { ShoppingCart } from 'lucide-svelte';
	import { onMount } from 'svelte';

	$: pathname = $page.url.pathname;
	const links = ['Shop', 'Contact Us', 'About'];
	let cart = 0;
	onMount(() => {
		const cartTimer = setInterval(() => {
			cart = Object.values(getCart()).reduce((acc, curr) => acc + curr.quantity, 0);
		}, 100);
		return () => clearInterval(cartTimer);
	});
</script>

<nav>
	<a href="/"><img src="/logo.svg" alt="logo" /></a>
	<div>
		{#each links as link}
			{@const href = '/' + link.toLowerCase().replaceAll(' ', '-')}
			<a {href} class:active={pathname === href}>{link}</a>
		{/each}
		<a class="cart" href="/cart" class:active={pathname === '/cart'}>
			<ShoppingCart size="20" />
			{#if cart}
				<span>{cart}</span>
			{/if}
		</a>
	</div>
</nav>
<main>
	<ViewTransition />
	<slot />
</main>

<style lang="scss">
	:global(:root) {
		view-transition-name: none;
	}

	nav {
		@apply fixed flex items-center justify-between;
		@apply z-50 h-14 w-full px-12;
		@apply bg-white/60  backdrop-blur-sm;
		@apply border-y border-border/40 border-t-transparent;
		> a > img {
			@apply h-8;
		}
		> div {
			@apply flex gap-8;
			> a {
				@apply text-sm opacity-60 hover:opacity-80;
				&.active {
					@apply opacity-100;
				}
				&.cart {
					@apply relative z-0;
					> span {
						@apply absolute -right-3 -top-1 rounded-full bg-primary px-1 text-xs font-bold text-white;
					}
				}
			}
		}
	}

	:global(main) {
		@apply relative min-h-screen  pt-14;
	}
</style>

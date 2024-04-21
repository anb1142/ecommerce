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
	<div class="links">
		{#each links as link}
			{@const href = '/' + link.toLowerCase().replaceAll(' ', '-')}
			<a {href} class:active={pathname === href}>{link}</a>
		{/each}
		<a class="cart" href="/cart" class:active={pathname === '/cart'}>
			<ShoppingCart size="20" />
			<span class:hide={!cart}>{cart}</span>
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
		@apply fixed z-50 flex h-14 w-full items-center justify-between border-y border-border/40  border-t-transparent bg-white/60 px-12 backdrop-blur-md;
		@apply px-[4vw] lg:px-[7.8vw];

		> a > img {
			@apply h-8;
		}
		> .links {
			@apply flex gap-8;
			> a {
				@apply text-sm opacity-60 hover:opacity-80;
				&.active {
					@apply opacity-100;
				}
			}
			.cart {
				@apply relative z-0;
				> span {
					@apply absolute -right-3 -top-1 rounded-full bg-primary px-1 text-xs font-bold text-white transition-opacity;
					&.hide {
						@apply opacity-0;
					}
				}
			}
		}
	}

	:global(main) {
		@apply relative   pt-14;
		min-height: calc(100svh - 3.5rem);
	}
	@media screen and (max-width: 768px) {
		nav {
			@apply px-6;
			> .links {
				@apply gap-4;
			}
		}
		:global(main) {
			min-height: calc(100svh - 3.5rem);
		}
	}
</style>

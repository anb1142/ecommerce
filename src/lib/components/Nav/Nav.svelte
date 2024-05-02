<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import CartLink from './CartLink.svelte';
	$: pathname = $page.url.pathname;
	const links = ['Shop'];

	let scrolled = false;
	let end = false; // TODO doesn't work in mobile
	onMount(() => {
		window.addEventListener('scroll', () => {
			scrolled = window.scrollY > 0;
			end =
				window.innerHeight + window.scrollY === document.body.offsetHeight &&
				document.body.offsetHeight > window.innerHeight;
		});
	});
</script>

<nav class:scrolled class:end>
	<a href={`/${pathname === '/' ? '' : '?has=1'}`}><img src="/logo.svg" alt="logo" /></a>
	<div class="links">
		{#each links as link}
			{@const href = '/' + link.toLowerCase().replaceAll(' ', '-')}
			<a {href} class:active={pathname === href}>{link}</a>
		{/each}
		<CartLink />
	</div>
</nav>

<style lang="scss">
	nav {
		--navInlineSpace: calc(var(--xSpace) + 0.5rem);
		@apply h-[--navHeight] rounded-lg border border-border/50  drop-shadow-sm backdrop-blur-md transition-all;
		@apply bottom-6 left-[--navInlineSpace] right-[--navInlineSpace] mt-0  bg-white/60 px-6;
		@apply md:bottom-auto md:left-[--xSpaceMd] md:right-[--xSpaceMd]  md:mt-2 md:bg-white md:px-12;

		position: fixed;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: space-between;

		&.scrolled {
			--scrolledX: calc(var(--xSpace) / 2);
			@apply bg-white/60;
			@apply md:left-[--scrolledX] md:right-[--scrolledX];
		}
		&.end {
			--xSpace: 3vw;
			@apply bg-white md:bg-white/60;
		}

		> a > img {
			@apply h-8;
		}
		> .links {
			@apply flex gap-6 md:gap-8;
			> a {
				@apply text-sm opacity-60 hover:opacity-80;
				&.active {
					@apply opacity-100;
				}
			}
		}
	}
</style>

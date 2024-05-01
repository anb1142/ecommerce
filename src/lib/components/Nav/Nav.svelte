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
			end = window.innerHeight + window.scrollY === document.body.offsetHeight;
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
		@apply fixed bottom-6 z-50  mt-0 flex h-[--navHeight] items-center  justify-between rounded-lg border border-border/50 bg-white/60 px-6 drop-shadow-sm backdrop-blur-md transition-all lg:bottom-auto lg:mb-0 lg:mt-2 lg:bg-white lg:px-12;
		left: var(--xSpace);
		right: var(--xSpace);
		&.scrolled {
			@apply bg-white/60;
			left: calc(var(--xSpace) + (var(--xSpace) / 3));
			right: calc(var(--xSpace) + (var(--xSpace) / 3));
		}

		> a > img {
			@apply h-8;
		}
		> .links {
			@apply flex gap-6 lg:gap-8;
			> a {
				@apply text-sm opacity-60 hover:opacity-80;
				&.active {
					@apply opacity-100;
				}
			}
		}
	}
	@media screen and (max-width: 768px) {
		nav {
			--xSpace: 7vw;
			&.scrolled {
				left: var(--xSpace);
				right: var(--xSpace);
			}
			&.end {
				--xSpace: 5vw;
				@apply bg-white;
			}
		}
	}
</style>

<script lang="ts">
	import { page } from '$app/stores';
	import CartLink from './CartLink.svelte';
	$: pathname = $page.url.pathname;

	export let links = ['Shop'];
</script>

<a href={`/${pathname === '/' ? '' : '?has=1'}`}><img src="/logo.svg" alt="logo" /></a>

<div class="links">
	{#each links as link}
		{@const href = '/' + link.toLowerCase().replaceAll(' ', '-')}
		<a {href} class:active={pathname === href}>{link}</a>
	{/each}
	<CartLink />
</div>

<style lang="scss">
	a > img {
		@apply h-8;
	}
	.links {
		@apply flex gap-6 md:gap-8;
		> a {
			@apply text-sm opacity-60 hover:opacity-80;
			&.active {
				@apply opacity-100;
			}
		}
	}
</style>

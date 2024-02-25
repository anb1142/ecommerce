<script lang="ts">
	import { page } from '$app/stores';
	$: pathname = $page.url.pathname;

	import links from './links';
</script>

<aside>
	<div>
		{#each Object.entries(links) as [link, { text }]}
			{@const href = '/admin/' + link}
			{@const active = pathname === href ? 'active' : ''}
			<a {href} class:active>{active ? '> ' : ''}{text}</a>
		{/each}
		<a href="/admin/logout">Logout</a>
	</div>
</aside>

<style lang="scss">
	aside {
		@apply flex flex-col p-4;
		@apply border  bg-white;
		width: 20%;
		height: 100svh;

		> div {
			@apply flex flex-col gap-4;
			> a {
				@apply opacity-80 hover:opacity-100;
				&.active {
					@apply opacity-100;
				}
			}
		}
	}
</style>

<script lang="ts">
	import { page } from '$app/stores';
	$: pathname = $page.url.pathname;

	import links from './links';
</script>

<aside>
	{#each Object.entries(links) as [link, { text }]}
		{@const href = '/admin/' + link}
		{@const active = pathname === href ? 'active' : ''}
		<a {href} class:active>{active ? '> ' : ''}{text}</a>
	{/each}
	<a href="/admin/logout">Logout</a>
</aside>

<style lang="scss">
	aside {
		@apply flex  w-1/5   flex-col gap-4 border-r p-4;
		> a {
			@apply opacity-80 hover:opacity-100;
			&.active {
				@apply opacity-100;
			}
		}
	}
</style>

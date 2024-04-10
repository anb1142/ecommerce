<script lang="ts">
	import { page } from '$app/stores';
	import toTitleCase from '@/utils/totitleCase';
	import { ChevronRight } from 'lucide-svelte';

	$: route = $page.url.pathname || '/';

	const getBreadcrumbs = (route: string) => {
		const paths = route.split('/');
		return paths
			.map((path, i) => ({
				path: toTitleCase(path),
				href: paths.slice(0, i + 1).join('/')
			}))
			.filter((path) => path.href !== '/' && path.href !== '');
	};
	$: breadcrumbs = getBreadcrumbs(route);
</script>

<div class="breadcrumbs">
	{#each breadcrumbs as { path, href }, i}
		{@const end = breadcrumbs.length - 1 === i}
		<a {href} class:end>{path}</a>
		{#if !end}
			<ChevronRight class="h-4 w-4 text-gray-700" />
		{/if}
	{/each}
</div>

<style lang="scss">
	.breadcrumbs {
		@apply flex items-center gap-2 pb-4;
		> a {
			@apply text-sm opacity-70;
			&.end {
				@apply opacity-100;
			}
		}
	}
</style>

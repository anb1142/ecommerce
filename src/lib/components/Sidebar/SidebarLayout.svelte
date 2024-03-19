<script lang="ts">
	import { page } from '$app/stores';
	import toTitleCase from '@/utils/totitleCase.ts';
	import Sidebar from './Sidebar.svelte';
	import Meta from '../Meta.svelte';
	import { Button } from '@/components/ui/button';
	import linkList from './links.ts';
	const links = { ...linkList };

	$: route = $page.route.id || '/';
	$: pageName = route.replace('/admin/', '').split('/').reverse().join(' ') || '';
	$: title = toTitleCase(pageName);
</script>

<Meta {title} />
<section>
	<Sidebar />
	<main>
		<div>
			<h1>{title}</h1>
			{#if links[pageName]?.new}
				<Button href={`${route}/new`}>New</Button>
			{/if}
		</div>

		<slot />
	</main>
</section>

<style lang="scss">

	section {
		@apply flex min-h-svh;
	}
	main {
		@apply bg-slate-50 p-4 px-8;
		@apply min-h-svh;
		width: 80%;
		div {
			@apply mb-8 flex items-center gap-4;
		}
	}
</style>

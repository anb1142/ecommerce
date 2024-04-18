<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '@/components/ui/button';
	import toTitleCase from '@/utils/totitleCase.ts';
	import Meta from '../Meta.svelte';
	import BreadCrumbs from './BreadCrumbs.svelte';
	import Sidebar from './Sidebar.svelte';
	import links from './links.ts';

	$: route = $page.url.pathname || '/';
	$: pageName = route.replace('/admin/', '').split('/').reverse().join(' ') || '';
	$: title = toTitleCase(pageName);
</script>

<Meta {title} />
<section>
	<Sidebar />
	<main>
		<header>
			<BreadCrumbs />
			<div class="title">
				<h1>{title}</h1>
				{#if links[pageName]?.new}
					<Button href={`${route}/create`}>New</Button>
				{/if}
			</div>
		</header>

		<slot />
	</main>
</section>

<style lang="scss">
	section {
		@apply flex min-h-svh;
	}
	main {
		@apply min-h-svh w-4/5 bg-slate-50 p-4 px-8;
		header {
			> .title {
				@apply mb-8 flex items-center gap-4;
			}
		}
	}
</style>

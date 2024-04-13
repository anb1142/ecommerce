<script lang="ts">
	import { type ITableFilterParams } from '@/utils/getTableFilterParams';
	import { Ellipsis } from 'lucide-svelte';
	import PaginationLink from './PaginationLink.svelte';

	export let totalRows: number;
	export let tableParams: ITableFilterParams;

	$: pages = Math.ceil(totalRows / tableParams.limit);
	$: page = tableParams.page;
	const pageLinks = (pages: number, page: number, inclPages = 3) => {
		let min = pages - 3;
		let startIndex;
		startIndex = Math.min(min, page - 1); // minPage at least lower than  3
		startIndex = Math.max(2, startIndex); // minPage at least higher than 2
		const endIndex = startIndex + inclPages;
		let a = [];
		for (let i = startIndex; i < endIndex && i < pages; i++) {
			a.push(i);
		}
		return a;
	};
	$: links = pageLinks(pages, page);
</script>

<div>
	<PaginationLink bind:page bind:pages bind:tableParams label="Previous" />
	<PaginationLink i={1} bind:page bind:tableParams />
	{#if links[0] > 2}
		<span aria-hidden>
			<Ellipsis class="h-4 w-4" />
		</span>
	{/if}
	{#each links as i (i)}
		<PaginationLink {i} bind:page bind:tableParams />
	{/each}

	{#if links[links.length - 1] < pages - 1}
		<span aria-hidden>
			<Ellipsis class="h-4 w-4" />
		</span>
	{/if}
	<PaginationLink bind:i={pages} bind:page bind:tableParams />
	<PaginationLink bind:page bind:pages bind:tableParams label="Next" />
</div>

<style lang="scss">
	div {
		@apply flex w-full justify-center  gap-1 border-t py-4;
		span {
			@apply flex size-10  items-center justify-center;
		}
	}
</style>

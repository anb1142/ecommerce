<script lang="ts">
	import {
		getDefaultTableParams,
		type ITableFilterParams
	} from '@/utils/getTableFilterParams';
	import { objToParams } from '@/utils/objToParams';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	export let label: 'Previous' | 'Next' | undefined = undefined;
	export let i = 1;
	export let page: number;
	export let pages: number | undefined = undefined;
	export let tableParams: ITableFilterParams;
	export let disabled = false;
	const getPageLink = (page: number, tableParams: ITableFilterParams) => {
		const data = {
			...getDefaultTableParams(tableParams),
			perPage: tableParams.limit,
			page
		};
		return objToParams(data);
	};
	$: {
		if (label === 'Next') {
			i = page + 1;
			disabled = page === pages;
		} else if (label === 'Previous') {
			i = page - 1;
			disabled = page === 1;
		}
	}
</script>

<a
	class:active={i === page}
	class:btn={label}
	class:disabled
	href={getPageLink(i, tableParams)}
>
	{#if label === 'Previous'}
		<ChevronLeft class="size-4" />
		{label}
	{:else if label === 'Next'}
		{label}
		<ChevronRight class="size-4" />
	{:else}
		{i}
	{/if}
</a>

<style lang="scss">
	a {
		@apply flex size-10 cursor-pointer items-center justify-center rounded-sm  text-sm font-medium transition-colors;
		&:hover {
			@apply bg-slate-100;
		}
		&.active {
			@apply pointer-events-none border;
		}
		&.btn {
			@apply w-auto border-0 px-4;
		}
		&.disabled {
			@apply pointer-events-none cursor-not-allowed opacity-50;
		}
	}
</style>

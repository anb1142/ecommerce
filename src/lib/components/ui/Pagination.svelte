<script lang="ts">
	import * as Pagination from '$lib/components/ui/pagination';
	import { setSearchParams } from '@/utils/setSearchParams';
	import { createEventDispatcher } from 'svelte';

	export let perPage: number;
	export let rowCount: number;
	export let currentPage: number;
	const dispatch = createEventDispatcher();

	const onJump = (page: number) => {
		dispatch('jump', { page });
	};

	const setPage = (page: number) => {
		setSearchParams({ limit: perPage, offset: (page - 1) * perPage || undefined });
		currentPage = page;
		onJump(page);
	};
</script>

<!-- 
<div>
	{#each Array.from({ length: 4 }, (_, i) => i + 1) as i (i)}
		<span class:active={i === current}>{i}</span>
	{/each}
	<span aria-hidden>
		<Ellipsis class="h-4 w-4" />
	</span>
</div> -->

<Pagination.Root count={rowCount} {perPage} let:pages class="border-t pb-2 pt-2">
	<Pagination.Content>
		<Pagination.Item>
			<Pagination.PrevButton on:click={() => setPage(currentPage - 1)} />
		</Pagination.Item>
		{#each pages as page (page.key)}
			{#if page.type === 'ellipsis'}
				<Pagination.Item>
					<Pagination.Ellipsis />
				</Pagination.Item>
			{:else}
				<Pagination.Item>
					<Pagination.Link
						{page}
						isActive={currentPage == page.value}
						on:click={() => setPage(page.value)}
					>
						{page.value}
					</Pagination.Link>
				</Pagination.Item>
			{/if}
		{/each}
		<Pagination.Item>
			<Pagination.NextButton on:click={() => setPage(currentPage + 1)} />
		</Pagination.Item>
	</Pagination.Content>
</Pagination.Root>
<!-- 
<style lang="scss">
	div {
		@apply flex w-full justify-center  gap-1 bg-red-50;
		span {
			@apply flex size-10 cursor-pointer items-center justify-center rounded-sm border text-sm;
			&.active {
				@apply cursor-default bg-black text-white;
			}
		}
	}
</style> -->

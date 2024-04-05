<script lang="ts">
	import { page } from '$app/stores';
	import type { IFields } from '@/schemas';
	import { setSearchParams } from '@/utils/setSearchParams';
	import { ArrowDownNarrowWide, ArrowUpNarrowWide } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import Pagination from './ui/Pagination.svelte';
	import fetchJSON from '@/utils/fetchJSON';
	type ITableOrder = 'asc' | 'desc';

	export let ths: IFields = [];
	export let rows: any = [];
	export let perPage = 15;
	export let rowCount = 0;

	export let table: string | undefined = undefined;
	let orderBy = $page.url.searchParams.get('orderBy') || 'id';
	let order = ($page.url.searchParams.get('order') as ITableOrder) || null || 'asc';
	let currentPage = Number($page.url.searchParams.get('offset')) / perPage || 1;

	const sort = async (column: string) => {
		if (!table) return;
		order = orderBy === column && order === 'asc' ? 'desc' : 'asc';
		if (column !== orderBy) orderBy = column;
		const data = {
			orderBy,
			order: order === 'asc' ? undefined : order,
			offset: undefined,
			limit: perPage
		};
		currentPage = 1;

		setSearchParams(data);
		await fetchTableData();
	};

	const fetchTableData = async () => {
		const data = await fetchJSON(`/admin/api/${table}${$page.url.search}`);
		rows = data.rows;
		rowCount = data.rowCount;
	};
	onMount(async () => {
		if (table) await fetchTableData();
	});
</script>

<section>
	<table>
		<thead>
			<tr>
				{#each ths as th}
					<!-- TODO onclick should be on div, div shouldn't exist when table is undefined -->
					<th on:click={() => sort(th.name)}>
						<div class:sort={table}>
							{th.label}
							{#if table}
								<span class:orderBy={orderBy === th.name}>
									{#if (orderBy === th.name && order === 'asc') || orderBy !== th.name}
										<ArrowUpNarrowWide class="w-4" />
									{:else}
										<ArrowDownNarrowWide class="w-4" />
									{/if}
								</span>
							{/if}
						</div>
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each rows as row}
				<tr>
					{#each Object.values(row) as value}
						<td>{value}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
	{#if rowCount > perPage}
		<Pagination on:jump={fetchTableData} bind:currentPage bind:perPage bind:rowCount />
	{/if}
</section>

<style lang="scss">
	section {
		@apply w-full overflow-auto  rounded-md border  bg-white;
	}

	table {
		@apply w-full overflow-hidden;
		tr {
			@apply border-b;
		}
		thead > tr {
			&:hover {
				@apply bg-white;
			}
			th {
				@apply px-2 py-1;
				> div {
					@apply select-none rounded-sm px-2 py-1;
					&.sort {
						@apply cursor-pointer transition-colors;
						&:hover {
							@apply bg-muted;
						}
					}
					@apply flex gap-4;

					> span {
						@apply opacity-0 transition-opacity;
						&.orderBy {
							@apply opacity-70;
						}
					}
				}
				&:hover > div > span {
					@apply opacity-40;
					&.orderBy {
						@apply opacity-80;
					}
				}
			}
		}
		tbody > tr {
			@apply transition-colors;
			&:hover {
				@apply bg-muted/50;
			}
			&:last-child {
				@apply border-0;
			}
			td {
				@apply p-2 px-4 transition-transform;

				&:hover {
					transform: scale(1.01);
				}
			}
		}
	}
</style>

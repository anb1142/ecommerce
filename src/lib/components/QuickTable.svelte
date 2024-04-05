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
	export let table: string | undefined = undefined;

	export let orderBy = $page.url.searchParams.get('orderBy') || 'id';
	let order = ($page.url.searchParams.get('order') as ITableOrder) || null || 'asc';

	let perPage = 15;
	let rowCount = 0;
	let currentPage = Number($page.url.searchParams.get('offset')) / perPage || 1;

	const sort = async (column: string) => {
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
					<th on:click={() => sort(th.name)}>
						<div>
							{th.label}
							<span class="sort" class:orderBy={orderBy === th.name}>
								{#if (orderBy === th.name && order === 'asc') || orderBy !== th.name}
									<ArrowUpNarrowWide class="w-4" />
								{:else}
									<ArrowDownNarrowWide class="w-4" />
								{/if}
							</span>
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
	<Pagination on:jump={fetchTableData} bind:currentPage {perPage} {rowCount} />
</section>

<style lang="scss">
	section {
		@apply w-full overflow-auto  rounded-md border  bg-white;
	}

	table {
		@apply w-full overflow-hidden;
		tbody > tr:last-child {
			@apply border-0;
		}
		tr {
			@apply border-b transition-colors;
			&:hover {
				@apply bg-muted/50;
			}
			th,
			td {
				@apply select-none border-0 p-2 px-4 text-left;
				transition: transform 100ms ease-out;
				&:hover {
					transform: scale(1.01);
				}
			}

			th {
				> div {
					@apply flex gap-4;
					> span {
						@apply opacity-0 transition-opacity;
						&.orderBy {
							opacity: 0.6 !important;
						}
					}
				}
				&:hover {
					@apply cursor-pointer;
					> div > span {
						@apply opacity-40;
					}
				}
			}
		}
	}
</style>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { IFields } from '@/schemas';
	import { ArrowDownNarrowWide, ArrowUpNarrowWide } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let ths: IFields = [];
	export let rows: any = [];
	export let table: string | undefined = undefined;

	let order = $page.url.searchParams.get('order') || 'asc';
	let orderBy = $page.url.searchParams.get('orderBy') || 'id';

	const sort = async (column: string) => {
		const params = $page.url.searchParams;
		order = orderBy === column && order === 'asc' ? 'desc' : 'asc';
		if (column !== orderBy) orderBy = column;

		params.set('orderBy', orderBy);
		params.set('order', order);

		goto(`?${params.toString()}`);
		fetchTableData();
	};

	const fetchTableData = async () => {
		const res = await fetch(`/admin/api/${table}${$page.url.search}`);
		const data = await res.json();
		console.log(`/admin/api/${table}${$page.url.search}`);
		rows = data;
	};
	onMount(() => {
		if (table) fetchTableData();
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
		<!-- <tfoot> <Pagination /> </tfoot> -->
	</table>
</section>

<style lang="scss">
	section {
		@apply w-full overflow-auto  rounded-md border  bg-white;
	}

	table {
		@apply w-full overflow-hidden;
		tbody > tr:last-child {
			border: none;
		}
		tr {
			@apply border-b  transition-colors;
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
					@apply flex  gap-4;
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

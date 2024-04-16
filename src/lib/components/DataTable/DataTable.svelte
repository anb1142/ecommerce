<script lang="ts">
	import type { IFields } from '@/schemas';
	import { type ITableFilterParams } from '@/utils/getTableFilterParams';
	import Pagination from '../Pagination/Pagination.svelte';
	import ActionsColumn from './ActionsColumn.svelte';
	import DataTableHead from './DataTableHead.svelte';

	export let ths: IFields = [];
	export let rows: any = [];
	export let totalRows: number;
	export let tableParams: ITableFilterParams;
	export let actions = false;
	export let sortable = false;
</script>

<section>
	<table>
		<DataTableHead bind:tableParams bind:ths bind:sortable bind:actions />

		<tbody>
			{#each rows as row}
				<tr>
					{#each Object.values(row) as value}
						<td>{value}</td>
					{/each}
					{#if actions}
						<td><ActionsColumn id={row.id} /></td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
	{#if totalRows > tableParams.limit}
		<Pagination bind:totalRows bind:tableParams />
	{/if}
</section>

<style lang="scss">
	section {
		@apply w-full overflow-auto  rounded-md border  bg-white;
	}

	table {
		@apply w-full overflow-hidden;

		tbody > tr {
			@apply border-b transition-colors;

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

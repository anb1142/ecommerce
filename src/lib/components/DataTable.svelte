<script lang="ts">
	import { afterNavigate, onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import type { IFields } from '@/schemas';
	import { objToParams } from '@/utils/setSearchParams';
	import { ArrowDownNarrowWide, ArrowUpNarrowWide } from 'lucide-svelte';
	import Pagination from './ui/Pagination.svelte';

	type ITableOrder = null | 'desc';

	export let ths: IFields = [];
	export let rows: any = [];
	export let perPage = 15;
	export let rowCount = 0;

	export let sortable = false;

	let table = $page.params.table;

	let orderBy = $page.url.searchParams.get('orderBy') || 'id';
	let order = $page.url.searchParams.get('order') as ITableOrder;
	let currentPage = Number($page.url.searchParams.get('currentPage')) || 1;

	const getSortLink = (column: string) => {
		let newOrder = orderBy === column && order === null ? 'desc' : undefined;
		const data = {
			orderBy: column,
			order: newOrder,
			currentPage: undefined,
			limit: perPage
		};
		return objToParams(data);
	};
	onNavigate(() => {
		orderBy = $page.url.searchParams.get('orderBy') || 'id';
		order = ($page.url.searchParams.get('order') || null) as ITableOrder;
	});
	afterNavigate(() => {
		if (table !== $page.params.table) {
			orderBy = 'id';
			order = null;
			table = $page.params.table;
		}
	});
</script>

<section>
	<table>
		<thead>
			<tr>
				{#each ths as th (th.name)}
					<!-- TODO remove onclick; sort doesn't work after immediate return of another page;fix pages; -->
					<th on:click={() => getSortLink(th.name)}>
						<a class:sort={sortable} href={getSortLink(th.name)}>
							{th.label}
							{#if sortable}
								<span class:orderBy={orderBy === th.name}>
									{#if (orderBy === th.name && !order) || orderBy !== th.name}
										<ArrowUpNarrowWide class="w-4" />
									{:else}
										<ArrowDownNarrowWide class="w-4" />
									{/if}
								</span>
							{/if}
						</a>
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
		<Pagination on:jump bind:currentPage bind:perPage bind:rowCount />
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
				> a {
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
				&:hover > a > span {
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

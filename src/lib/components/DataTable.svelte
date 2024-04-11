<script lang="ts">
	import type { IFields } from '@/schemas';
	import { objToParams } from '@/utils/setSearchParams';
	import { ArrowDownNarrowWide, ArrowUpNarrowWide } from 'lucide-svelte';

	export let ths: IFields = [];
	export let rows: any = [];
	export let perPage: number;
	export let totalRows: number;
	export let tableParams: {
		orderBy: 'id';
		order: null | 'desc';
		limit: number;
	};

	let sortable = true;

	const getSortLink = (col: string) => {
		let order = tableParams.orderBy === col && !tableParams.order ? 'desc' : undefined;
		const data = {
			orderBy: col,
			order
		};
		return objToParams(data);
	};
</script>

<section>
	<table>
		<thead>
			<tr>
				{#each ths as th (th.name)}
					<th>
						<a class:sort={sortable} href={getSortLink(th.name)}>
							{th.label}
							{#if sortable}
								<span class:orderBy={tableParams.orderBy === th.name}>
									{#if (tableParams.orderBy === th.name && tableParams.order === null) || tableParams.orderBy !== th.name}
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
	<!-- {#if rowCount > perPage}
		<Pagination on:jump bind:currentPage bind:perPage bind:rowCount />
	{/if} -->
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

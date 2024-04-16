<script lang="ts">
	import type { IFields } from '@/schemas';
	import { objToParams } from '@/utils/objToParams';
	import { ArrowDownNarrowWide, ArrowUpNarrowWide } from 'lucide-svelte';

	import {
		getDefaultTableParams,
		type ITableFilterParams
	} from '@/utils/getTableFilterParams';
	export let actions = false;
	export let sortable = false;
	export let ths: IFields = [];
	export let tableParams: ITableFilterParams;
	const getSortLink = (orderBy: string) => {
		let order =
			tableParams.orderBy === orderBy && !tableParams.order ? 'desc' : undefined;

		const data = { ...getDefaultTableParams(tableParams), orderBy, order, page: 1 };
		return objToParams(data);
	};
</script>

<thead>
	<tr>
		{#each ths as th (th.name)}
			<th>
				<a class:sort={sortable} href={getSortLink(th.name)}>
					{th.label}
					{#if sortable}
						<span class:orderBy={tableParams.orderBy === th.name}>
							{#if (tableParams.orderBy === th.name && !tableParams.order) || tableParams.orderBy !== th.name}
								<ArrowUpNarrowWide class="w-4" />
							{:else}
								<ArrowDownNarrowWide class="w-4" />
							{/if}
						</span>
					{/if}
				</a>
			</th>
		{/each}
		{#if actions}
			<th>Actions</th>
		{/if}
	</tr>
</thead>

<style lang="scss">
	thead > tr {
		@apply border-b;
		&:hover {
			@apply bg-white;
		}
		> th {
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
</style>

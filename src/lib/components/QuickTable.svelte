<script lang="ts">
	import { ArrowDownUp } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let ths: string[] = [];
	export let rows: any = [];

	const sort = (th: string) => {
		$page.url.searchParams.set('orderBy', th);
		goto(`?${$page.url.searchParams.toString()}`);
	};
</script>

<section>
	<table>
		<thead>
			<tr>
				{#each ths as th}
					<th on:click={() => sort(th)}>
						<div>
							{th} <span class="sort"><ArrowDownUp class="sort w-4" /></span>
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
</section>

<style lang="scss">
	section {
		// @apply w-full overflow-hidden rounded-lg  border bg-white;
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
				@apply border-0 p-2 px-4 text-left;
				transition: transform 100ms ease-out;
				&:hover {
					transform: scale(1.01);
				}
			}

			th {
				&:hover {
					@apply cursor-pointer;
					> div > span {
						@apply opacity-40;
					}
				}
				> div {
					@apply flex  gap-4;
					> span {
						@apply opacity-10 transition-opacity;
					}
				}
			}
		}
	}
</style>

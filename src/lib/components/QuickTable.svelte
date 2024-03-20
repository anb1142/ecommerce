<script lang="ts">
	export let ths: string[] = [];
	export let rows: any = [];
</script>

<section>
	<table>
		<thead>
			<tr>
				{#each ths as th}
					<th>{th}</th>
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
		@apply w-full overflow-hidden rounded-lg  border bg-white;
	}
	table {
		@apply w-full;
		// td,
		// th {
		// 	@apply text-center;
		// }
		& :global(th) {
			@apply border-x py-2;
		}
		& :global(td) {
			@apply border py-2 text-center;
		}
	}
</style>

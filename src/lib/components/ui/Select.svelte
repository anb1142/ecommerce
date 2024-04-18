<script lang="ts">
	import * as Select from '@/components/ui/select/index.ts';
	import type { optType } from '@/schemas';

	export let opts: optType[];
	export let placeholder = 'Choose an option';
	export let name: string;
	export let id: string;
</script>

<select {name} {id}>
	<option value="" disabled selected>{placeholder}</option>
	{#each opts as { value, label, selected }}
		<option {value} {selected}>{label}</option>
	{/each}
</select>

<!-- <div class="select">
	<input type="checkbox" />
	<div class="options">
		<div class="default">
			<span></span>
			<li>{label}</li>
		</div>
		{#each opts as { value, label }}
			<div>
	
				<li {value}>{label}</li>
			</div>
		{/each}
	</div>
</div> -->
<!-- <span class:ticked>
					<Check class="size-4" />
				</span> -->
<style lang="scss">
	// .select {
	// 	@apply relative;
	// 	> input {
	// 		@apply w-full;
	// 		&:before {
	// 			@apply absolute inset-0  rounded-md border border-input bg-white px-3 py-2 text-sm;
	// 			content: '';
	// 		}
	// 		&:checked ~ .options {
	// 			@apply block;
	// 		}
	// 	}
	// 	> .options {
	// 		@apply absolute mt-1 hidden w-full rounded-md border border-input bg-white p-1 text-sm;
	// 		@apply z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md;
	// 		> div {
	// 			// @apply flex items-center py-1;
	// 			@apply relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground;
	// 			span {
	// 				@apply absolute left-2;
	// 				&.ticked {
	// 					@apply visible;
	// 				}
	// 			}
	// 			&:hover {
	// 				@apply bg-slate-50;
	// 			}
	// 		}
	// 		&.default {
	// 			@apply py-1.5 pl-8 pr-2 text-sm font-semibold;
	// 		}
	// 	}
	// }
	select {
		@apply flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50;
		> option {
			@apply size-4;
		}
	}
</style>

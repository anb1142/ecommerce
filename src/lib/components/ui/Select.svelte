<script lang="ts">
	type optType = {
		value: string;
		text: string;
	};
	export let name: string;
	export let id: string;
	export let opts: optType[] = [];
</script>

<select {name} {id}>
	<option value="" disabled selected>Choose an option</option>
	{#each opts as { value, text }}
		<option {value}>{text}</option>
	{/each}
</select>

<style lang="scss">
	select {
		@apply flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50;
		> option {
			@apply py-4;
		}
	}
</style>

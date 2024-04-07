<script lang="ts">
	import Select from '@/components/ui/Select.svelte';
	import { Input } from '@/components/ui/input';
	import { Label } from '@/components/ui/label';
	import { Textarea } from '@/components/ui/textarea';
	import type { optType } from '@/schemas';
	import toTitleCase from '@/utils/totitleCase';

	type IValue = string | number | File;

	export let name = '';
	export let label = toTitleCase(name);
	export let type = name === 'password' ? 'password' : 'text';
	export let value: IValue = type === 'number' ? NaN : '';

	export let opts: optType[] | undefined = undefined;
	let error = false;
</script>

<div>
	<Label for={name}>
		{label}
		{#if error}
			<span></span>
		{/if}
	</Label>
	{#if type === 'area'}
		<Textarea id={name} {name} />
	{:else if type === 'boolean'}
		<Select
			id={name}
			{name}
			{label}
			opts={[
				{ value: 'true', label: 'Yes' },
				{ value: 'false', label: 'No' }
			]}
		/>
	{:else if opts}
		<Select {label} id={name} {name} {opts} placeholder="Choose a Category" />
	{:else}
		<Input id={name} {type} {name} {...$$props} bind:value />
	{/if}
</div>

<script lang="ts">
	import { Input } from '@/components/ui/input';
	import { Label } from '@/components/ui/label';
	import { Textarea } from '@/components/ui/textarea';
	import Select from '@/components/ui/Select.svelte';
	import toTitleCase from '@/utils/totitleCase';

	type optType = {
		value: string;
		text: string;
	};

	type IValue = string | number | File;

	export let name = '';
	export let label = toTitleCase(name);
	export let type = name === 'password' ? 'password' : 'text';
	export let value: IValue = type === 'number' ? NaN : '';

	export let opts: optType[];
</script>

<div>
	<Label for={name}>{label}</Label>
	{#if type === 'area'}
		<Textarea id={name} {name} />
	{:else if opts}
		<Select id={name} {name} {opts} />
	{:else}
		<Input id={name} {type} {name} {...$$props} bind:value />
	{/if}
</div>

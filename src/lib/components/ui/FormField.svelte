<script lang="ts">
	import { Input } from '@/components/ui/input';
	import { Label } from '@/components/ui/label';
	import { Textarea } from '@/components/ui/textarea';
	import toTitleCase from '@/utils/totitleCase';

	type IValue = string | number | File;

	export let name = '';
	export let label = toTitleCase(name);
	export let type = name === 'password' ? 'password' : 'text';
	export let value: IValue = type === 'number' ? NaN : '';
</script>

<div>
	<Label for={name}>{label}</Label>
	{#if type === 'area'}
		<Textarea id={name} {name} />
	{:else}
		<Input id={name} {type} {name} {...$$props} bind:value />
	{/if}
</div>

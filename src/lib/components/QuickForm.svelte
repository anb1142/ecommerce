<script lang="ts">
	import type { IFields } from '@/schemas';
	import SubmitForm from './SubmitForm.svelte';
	import FormField from './ui/FormField.svelte';
	import toTitleCase from '@/utils/totitleCase';

	export let fields: IFields;
	export let action = 'create';
	export let btn = toTitleCase(action);
	let inclFile = fields.some((field) => field.type === 'file');
</script>

<SubmitForm {inclFile} {btn} action="?/{action}">
	<slot />
	{#each fields as field}
		<FormField {...field} />
	{/each}
</SubmitForm>

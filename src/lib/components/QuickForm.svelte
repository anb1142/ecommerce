<script lang="ts">
	import type { IFields } from '@/schemas';
	import SubmitForm from './SubmitForm.svelte';
	import FormField from './ui/FormField.svelte';

	export let fields: IFields;
	export let action = 'create';
</script>

<SubmitForm action="?/{action}" btn="Create">
	{#each fields as field}
		<FormField {...field} />
	{/each}
</SubmitForm>

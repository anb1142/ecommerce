<script lang="ts">
	import type { IFields } from '@/schemas';
	import SubmitForm from './SubmitForm.svelte';
	import FormField from './ui/FormField.svelte';

	export let fields: IFields;
</script>

<SubmitForm action="?/create" btn="Create">
	{#each fields as field}
		<FormField {...field} />
	{/each}
</SubmitForm>

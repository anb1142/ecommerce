<script>
	import QuickForm from '@/components/QuickForm.svelte';
	export let data;
</script>

<QuickForm fields={data.fields} action="edit">
	<input type="hidden" name="id" value={data.id} />
</QuickForm>

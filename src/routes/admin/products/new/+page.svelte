<script>
	import QuickForm from '@/components/QuickForm.svelte';
	// import { productFields as fields } from '@/schemas';
	export let data;
</script>

<QuickForm fields={data.fields} />

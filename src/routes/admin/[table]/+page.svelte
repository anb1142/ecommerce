<script lang="ts">
	import { page } from '$app/stores';
	import DataTable from '@/components/DataTable/DataTable.svelte';
	import Dialog from '@/components/Dialog/Dialog.svelte';

	export let data;
	const remove = () => {
		const id = $page.url.searchParams.get('delete');
		console.log(id);
	};
</script>

<DataTable {...data} actions={true} sortable={true} />
<Dialog name="delete" confirm={remove} />

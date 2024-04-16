<script lang="ts">
	import DataTable from '@/components/DataTable/DataTable.svelte';
	export let data;
</script>

<DataTable {...data} actions={true} sortable={true} />

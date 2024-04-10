<script lang="ts">
	import DataTable from '@/components/DataTable.svelte';
	export let data;
</script>

<DataTable rowCount={data.rowCount} rows={data.rows} ths={data.ths} sortable={true} />

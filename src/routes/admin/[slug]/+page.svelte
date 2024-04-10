<script lang="ts">
	import QuickTable from '@/components/QuickTable.svelte';
	export let data;
</script>

<QuickTable rowCount={data.rowCount} rows={data.rows} ths={data.ths} sortable={true} />

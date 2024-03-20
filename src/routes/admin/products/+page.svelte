<script lang="ts">
	import QuickTable from '@/components/QuickTable.svelte';
	import { productCols as ths } from '@/schemas';

	export let data;
	const { rows } = data;
</script>

<QuickTable {rows} {ths} />

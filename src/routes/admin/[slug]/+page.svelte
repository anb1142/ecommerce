<script lang="ts">
	import QuickTable from '@/components/QuickTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { rows, ths } = data;
</script>

<QuickTable {rows} {ths} />

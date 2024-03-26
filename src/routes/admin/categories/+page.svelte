<script lang="ts">
	import QuickTable from '@/components/QuickTable.svelte';
	import { categoryCols as ths } from '@/schemas';
</script>

<QuickTable {ths} table="category" />

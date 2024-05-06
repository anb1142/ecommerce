<script lang="ts">
	import ProductPage from '@/components/shop/ProductPage.svelte';
	export let data;
</script>

<ProductPage newProduct={data.product} />

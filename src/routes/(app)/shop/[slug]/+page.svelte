<script>
	import Meta from '@/components/Meta.svelte';
	import ProductPage from '@/components/shop/ProductPage.svelte';
	export let data;
</script>

<Meta title={data.product.name} />
<ProductPage product={data.product} />

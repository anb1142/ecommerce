<script>
	import ShopCard from '@/components/shop/ShopCard.svelte';
	let p = {
		id: 1,
		src: '/defaultCardImg.avif',
		alt: '',
		title: 'asd',
		subtitle: 'asd'
	};
	$: products = [p, p, p, p, p];
</script>

<section>
	{#each products as product (product.id)}
		<ShopCard {...product} />
	{/each}
	{#each Array(products.length < 3 ? 3 - products.length : 0) as i}
		<span />
	{/each}
</section>

<style lang="scss">
	section {
		@apply grid gap-4 py-4;
		grid-template-columns: repeat(auto-fit, minmax(375px, 1fr));
	}
</style>

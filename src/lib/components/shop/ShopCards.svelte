<script>
	import ShopCard from '@/components/shop/ShopCard.svelte';
	let p = {
		id: 1,
		src: '/defaultCardImg.avif',
		alt: '',
		title: 'asd',
		subtitle: 'asd'
	};
	let products = Array.from({ length: 5 }, (_, i) => ({ ...p, id: i + 1 }));
</script>

<section>
	{#each products as product (product.id)}
		<ShopCard {...product} />
	{/each}
	{#each Array(products.length < 3 ? 3 - products.length : 0) as i}
		<span></span>
	{/each}
</section>

<style lang="scss">
	section {
		@apply grid gap-4 p-4;
		grid-template-columns: repeat(auto-fit, minmax(375px, 1fr));
	}
</style>

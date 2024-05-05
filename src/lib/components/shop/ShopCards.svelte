<script lang="ts">
	import ShopCard from '@/components/shop/ShopCard.svelte';
	import type { IImagedProduct } from '@/schemas';
	import { productList } from '@/stores/products';

	export let limit: number | undefined = undefined;
	export let products: IImagedProduct[] = $productList.slice(0, limit);
</script>

<section>
	{#each products as { id, name, price, images } (id)}
		<ShopCard {price} {name} {id} src={images[0].url} alt={images[0].alt} />
	{/each}
	{#each Array(products.length < 3 ? 3 - products.length : 0) as i}
		<span></span>
	{/each}
</section>

<style lang="scss">
	section {
		@apply flex flex-col flex-wrap;
		@apply gap-4 py-4 md:grid;
		grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
	}
</style>

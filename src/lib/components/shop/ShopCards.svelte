<script lang="ts">
	import ShopCard from '@/components/shop/ShopCard.svelte';
	import type { IImagedProduct } from '@/schemas';

	export let products: IImagedProduct[];
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
		@apply grid gap-4 p-4;
		grid-template-columns: repeat(auto-fit, minmax(375px, 1fr));
	}
</style>

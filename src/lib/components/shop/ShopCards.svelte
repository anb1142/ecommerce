<script lang="ts">
	import ShopCard from '@/components/shop/ShopCard.svelte';
	import type { IImagedProduct } from '@/schemas';

	export let products: IImagedProduct[];
	export let noSpacing = false;
</script>

<section class:noSpacing>
	{#each products as { id, name, price, images } (id)}
		<ShopCard {price} {name} {id} src={images[0].url} alt={images[0].alt} />
	{/each}
	{#each Array(products.length < 3 ? 3 - products.length : 0) as i}
		<span></span>
	{/each}
</section>

<style lang="scss">
	section {
		@apply grid gap-4 py-4;
		@apply mx-[4vw] lg:mx-[7vw];
		grid-template-columns: repeat(auto-fit, minmax(375px, 1fr));
		&.noSpacing {
			@apply m-0;
		}
	}
	@media screen and (max-width: 768px) {
		section {
			@apply flex flex-col flex-wrap;
		}
	}
</style>

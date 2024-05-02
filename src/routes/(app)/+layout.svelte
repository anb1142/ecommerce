<script lang="ts">
	import Nav from '@/components/Nav/Nav.svelte';
	import ViewTransition from '@/components/ViewTransition.svelte';
	import { setProducts } from '@/stores/products';
	import { onMount } from 'svelte';

	export let data;

	onMount(async () => {
		setProducts(await data.allProducts);
	});
</script>

<Nav />
<main>
	<ViewTransition />
	<slot />
</main>

<style lang="scss">
	:global(:root) {
		--xSpace: 3vw;
		--xSpaceMd: 1vw;
		--navHeight: 3.5rem;

		view-transition-name: none;
	}

	:global(main) {
		@apply relative;

		--minH: calc(100svh - var(--navHeight));
		--navBottomSpacing: calc(1rem + var(--navHeight));
		@apply min-h-[--minH] px-[--xSpace] pb-[--navBottomSpacing] pt-4;

		--minHMd: 100svh;
		--navTopSpacing: calc(1.5rem + var(--navHeight));
		@apply md:min-h-[--minHMd] md:px-[--xSpaceMd] md:pb-0 md:pt-[--navTopSpacing];
	}
</style>

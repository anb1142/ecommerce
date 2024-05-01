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
		--xSpace: 2vw;
		--navHeight: 3.5rem;

		view-transition-name: none;
	}

	:global(main) {
		@apply relative m-auto px-[--xSpace] pt-[--navHeight];
		// width: 1280px;
		min-height: calc(100svh);
	}
	@media screen and (max-width: 768px) {
		:global(main) {
			min-height: calc(100svh - var(--navHeight));
			@apply pb-[--navHeight] pt-4;
		}
	}
</style>

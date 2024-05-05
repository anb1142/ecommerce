<script lang="ts">
	import Nav from '@/components/Nav/Nav.svelte';
	import ViewTransition from '@/components/ViewTransition.svelte';
	import { setProducts } from '@/stores/products';

	export let data;
	setProducts(data.allProducts);
</script>

<Nav />
<main>
	<ViewTransition />
	<slot />
</main>

<style lang="scss">
	:global(:root) {
		--navHeight: 3.5rem;
		--minH: 100dvh;
		--inlinePadding: 1vw;
		--defaultSpace: 0.5rem;

		--navTopSpace: calc(var(--defaultSpace) * 2 + var(--navHeight));
		--navBtmSpace: var(--defaultSpace);

		--navTotalYSpace: calc(var(--navHeight) + var(--defaultSpace) * 3);
		view-transition-name: none;
	}
	@media screen and (max-width: 768px) {
		:global(:root) {
			--inlinePadding: 3vw;

			--defaultSpace: 1rem;
			--navTopSpace: var(--defaultSpace);
			--navBtmSpace: calc(var(--defaultSpace) * 2 + var(--navHeight));
		}
	}

	:global(main) {
		@apply relative;
		@apply min-h-[--minH] px-[--inlinePadding] pb-[--navBtmSpace] pt-[--navTopSpace];
	}
</style>

<script lang="ts">
	import ProductImages from '@/components/shop/ProductImages.svelte';
	import type { IImagedProduct } from '@/schemas';
	import CartButton from './Cart/CartButton.svelte';

	export let product: IImagedProduct;
	const { id, name, price, images, description } = product;
</script>

<section style:--card="card-{id}">
	<ProductImages {images} {id} />
	<div class="info">
		<div class="title">
			<h1>{name}</h1>
			<p>${price}</p>
		</div>
		<div class="desc">
			{description}
		</div>
		<CartButton {id} />
	</div>
</section>

<!-- TODO only works in svh -->
<style lang="scss">
	section {
		@apply flex gap-4 rounded-lg border bg-white  p-4 shadow-md md:mt-4 md:flex-row;

		// @apply inset-0 bottom-14 top-4;
		view-transition-name: var(--card);
		height: calc(100svh - var(--navHeight) - 3rem);
		> :global(div) {
			@apply h-full;
			width: 55%;
		}

		.info {
			@apply flex  flex-col gap-4 px-4;
			width: 45%;
			.title {
				@apply flex flex-col gap-1;
			}
		}
		.desc {
			@apply h-1/2 overflow-y-auto rounded-md border bg-muted p-4 shadow-inner;
		}
	}
	// TODO tablet
	@media screen and (max-width: 768px) {
		section {
			@apply flex-col gap-2;

			> :global(div) {
				@apply h-3/5 w-full;
				&:last-of-type {
					@apply h-2/5;
				}
			}
			.info {
				@apply w-full px-1;
			}
		}
	}
</style>

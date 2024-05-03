<script lang="ts">
	import ProductImages from '@/components/shop/ProductImages.svelte';
	import type { IImagedProduct } from '@/schemas';
	import CartButton from './Cart/CartButton.svelte';

	export let product: IImagedProduct;
	const { id, name, price, images, description } = product;
</script>

<div style:--card="card-{id}" class="product">
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
</div>

<style lang="scss">
	.product {
		height: calc(100dvh - var(--navTotalYSpace));
		@apply flex rounded-lg border bg-white p-4 shadow-md;
		@apply flex-col gap-2;
		@apply lg:flex-row lg:gap-4;

		view-transition-name: var(--card);
		> :global(div) {
			@apply h-3/5 w-full;
			@apply md:h-[50%];
			@apply lg:h-full lg:w-[55%];
		}

		.info {
			@apply flex flex-col gap-4;
			@apply h-2/5 w-full px-1;
			@apply md:h-[50%];
			@apply lg:h-full lg:w-[45%] lg:px-4;

			.title {
				@apply flex flex-col gap-1;
			}
		}
		.desc {
			@apply h-1/2 overflow-y-auto rounded-md border bg-muted p-4 shadow-inner;
		}
	}
	// TODO tablet
</style>

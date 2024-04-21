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

<style lang="scss">
	section {
		@apply m-4  mb-0 flex gap-4 rounded-lg border bg-white p-4 shadow-md md:flex-row lg:mx-[8vw];
		@apply mx-[4vw] lg:mx-[7vw];

		@apply absolute inset-0 bottom-4 top-14;
		view-transition-name: var(--card);
		height: 90svh;
		> :global(div) {
			@apply h-full w-1/2;
		}

		.info {
			@apply flex flex-col gap-4 px-4;
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
				@apply px-1;
			}
		}
	}
</style>

<script lang="ts">
	import ProductImages from '@/components/shop/ProductImages.svelte';
	import type { IImagedProduct } from '@/schemas';

	export let product: IImagedProduct;
	const { id, name, images, description } = product;
</script>

<section style:--card="card-{id}">
	<ProductImages {images} {id} />
	<div class="info">
		<div class="title">
			<h1>{name}</h1>
		</div>
		<div class="desc">
			{description}
		</div>
	</div>
</section>

<style lang="scss">
	section {
		@apply m-4 mb-0 flex gap-4 rounded-lg border bg-white p-4 shadow-md;
		@apply absolute inset-0 bottom-4 top-14;
		view-transition-name: var(--card);
		// animation-duration: 4s;

		> :global(div) {
			@apply w-1/2;
		}

		.info {
			@apply flex-col px-4;
			.title {
				@apply mb-2 flex flex-col gap-1;
			}
		}
	}
	// TODO tablet
	@media screen and (max-width: 768px) {
		section {
			@apply flex-col gap-2;

			> :global(div) {
				@apply h-1/2 w-full;
			}
			.info {
				@apply px-1;
			}
		}
	}
</style>

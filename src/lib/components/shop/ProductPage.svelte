<script lang="ts">
	import ProductImages from '@/components/shop/ProductImages.svelte';
	import CartButton from './Cart/CartButton.svelte';
	import { page } from '$app/stores';
	import { productStore, updateProducts } from '@/stores/products';
	import Meta from '@/components/Meta.svelte';
	import type { IImagedProduct } from '@/schemas';
	import { onMount } from 'svelte';
	import { isPromise } from '@/utils/isPromise';

	export let productId: number = Number($page.params.slug);
	export let newProduct: IImagedProduct | Promise<IImagedProduct> | undefined = undefined;
	export let product: IImagedProduct = $productStore[productId];

	if (newProduct && !isPromise(newProduct)) product = newProduct as IImagedProduct;
	onMount(async () => {
		if (!isPromise(newProduct)) return;
		product = (await newProduct) as IImagedProduct;
		updateProducts(product);
	});
</script>

{#if product}
	<Meta title={product.name} />

	<div style:--card="card-{product.id}" class="product">
		<ProductImages images={product.images} id={product.id} />
		<div class="info">
			<div class="title">
				<h1>{product.name}</h1>
				<p>${product.price}</p>
			</div>
			<div class="desc">
				{product.description}
			</div>
			<CartButton id={product.id} />
		</div>
	</div>
{/if}

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

<script lang="ts">
	import type { IImagedProduct } from '@/schemas';
	import { deleteCartItem, getCart, type ICartState } from '@/utils/cart';
	import { Trash2 } from 'lucide-svelte';
	import CartButton from './CartButton.svelte';

	export let products: IImagedProduct[] = [];
	export let cart: ICartState = {};
	function resetCart() {
		cart = getCart();
	}
</script>

<div class="products">
	{#each products.filter(({ id }) => id in cart) as { id, name, price, images } (id)}
		{@const src = images[0].url}
		{@const alt = images[0].alt}
		<div class="product">
			<img {src} {alt} />
			<div class="details">
				<div class="info">
					<a href={`/shop/${id}`}>{name}</a>
					<p>${price} * {cart[id].quantity} = ${Number(price) * cart[id].quantity}</p>
					<button
						on:click={() => {
							deleteCartItem(String(id));
							resetCart();
						}}
					>
						<Trash2 />
					</button>
				</div>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="quantity" on:click={resetCart}>
					<CartButton {id} type="+" />
					<p>{cart[id].quantity}</p>
					<CartButton {id} type="-" />
				</div>
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.products {
		@apply flex flex-col gap-4;
		width: 70%;
		.product {
			@apply flex   h-32 items-center gap-2 overflow-hidden rounded-lg border  bg-white p-2  shadow-md lg:p-4;
			view-transition-name: var(--card);
			animation-duration: 4s;

			> img {
				@apply aspect-square h-full rounded-lg object-contain;
				view-transition-name: var(--image);
			}
			.details {
				@apply flex  w-full items-center justify-between overflow-hidden py-2;
				// width: 75%;

				.info {
					@apply ml-4  flex h-full flex-col justify-between gap-1 overflow-hidden text-ellipsis;
					// width: 80%;
					> a {
						@apply overflow-hidden text-ellipsis text-nowrap pr-2 text-xl font-semibold hover:underline;
					}
					> button {
						@apply w-fit rounded-sm bg-red-50 p-2 transition-colors hover:bg-red-600 hover:text-white;
					}
				}
				.quantity {
					@apply flex flex-col text-center;
				}
			}
		}
	}
	@media screen and (max-width: 768px) {
		.products {
			@apply flex flex-col gap-4;
			width: 100%;
		}
	}
</style>

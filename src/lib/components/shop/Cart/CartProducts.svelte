<script lang="ts">
	import type { IImagedProduct } from '@/schemas';
	import { getCart, removeFromCart, type ICartState, deleteCartItem } from '@/utils/cart';
	import CartButton from './CartButton.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import { Trash2 } from 'lucide-svelte';

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
			<div class="txt">
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
			@apply flex  h-32 items-center justify-between gap-2 overflow-hidden rounded-lg border  bg-white p-4 shadow-md;
			view-transition-name: var(--card);
			animation-duration: 4s;

			> img {
				@apply aspect-square h-full rounded-lg object-contain;
				view-transition-name: var(--image);
			}
			.txt {
				@apply flex  w-full justify-between;

				.info {
					@apply ml-4  flex h-full flex-col justify-between gap-1;
					> a {
						@apply text-xl font-semibold hover:underline;
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

<script lang="ts">
	import Button from '@/components/ui/button/button.svelte';
	import type { IImagedProduct } from '@/schemas';
	import type { ICartState } from '@/utils/cart';

	export let products: IImagedProduct[] = [];
	export let cart: ICartState = {};
	$: total = products.reduce(
		(acc, curr) => acc + Number(curr.price) * cart[curr.id].quantity,
		0
	);
</script>

<div class="checkout">
	<h2>Calculations</h2>
	{#each products as { id, name, price }}
		<p>
			<span class="name">{name}</span>
			<span class="price">
				{Number(price) * cart[id].quantity}
			</span>
		</p>
	{/each}
	<hr />
	<p>Total <span>$ {total}</span></p>
	<Button>Checkout</Button>
</div>

<style lang="scss">
	.checkout {
		@apply flex h-full  flex-col gap-2 rounded-lg border bg-white p-4 shadow-md;
		width: 28%;
		h2 {
			@apply mb-2 scroll-m-20 text-2xl font-semibold tracking-tight;
		}
		> p {
			@apply flex  justify-between;
			.name {
				@apply w-4/6 overflow-hidden text-ellipsis;
			}
			&:last-of-type {
				@apply py-2 font-semibold;
			}
		}
	}
	@media screen and (max-width: 768px) {
		.checkout {
			@apply fixed bottom-20  m-auto h-fit w-full;
			width: calc(100% - 1rem);
		}
	}
</style>

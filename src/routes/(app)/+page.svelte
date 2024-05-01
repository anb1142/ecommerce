<script lang="ts">
	import Hero from '@/components/Home/Hero.svelte';
	import Services from '@/components/Home/Services.svelte';
	import Meta from '@/components/Meta.svelte';
	import ShopCards from '@/components/shop/ShopCards.svelte';
	import type { IImagedProduct } from '@/schemas';
	import { productStore, updateProducts } from '@/stores/products.ts';
	import { isPromise } from '@/utils/isPromise.ts';
	import { Facebook, Twitter, Youtube } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let data;
	onMount(async () => {
		updateProducts(await data.products);
	});
	if (!isPromise(data.products)) updateProducts(data.products as IImagedProduct[]);
	$: products = Object.values($productStore).slice(0, 4);

	type ISocial = { href: string; Icon: typeof Facebook };
	let socials: ISocial[] = [
		{ href: 'http://facebook.com', Icon: Facebook },
		{ href: 'http://twitter.com', Icon: Twitter },
		{ href: 'http://youtube.com', Icon: Youtube }
	];
</script>

<Meta />
<section class="home">
	<Hero />
	<div class="popular">
		<h1>Most Popular</h1>

		<ShopCards {products} />
	</div>
	<Services />
</section>

<footer>
	<div>
		<p>© {new Date().getFullYear()} ANB Inc. All Rights Reserved.</p>
		<div class="socials">
			{#each socials as { href, Icon }}
				<a {href} target="_blank">
					<Icon />
				</a>
			{/each}
		</div>
	</div>
</footer>

<style lang="scss">
	.home {
		@apply flex flex-col gap-10;

		.popular {
			> h1 {
				@apply mb-5 text-center;
			}
		}
	}
	footer {
		@apply relative py-6;

		> div {
			@apply flex flex-col items-center  justify-center gap-4 rounded-lg border  bg-white p-6 drop-shadow-xl lg:flex-row lg:gap-8;
			.socials {
				@apply flex gap-4;
			}
		}
	}
</style>

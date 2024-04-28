<script lang="ts">
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
	$: products = Object.values($productStore).slice(0, 3);

	type ISocial = { href: string; Icon: typeof Facebook };
	let socials: ISocial[] = [
		{ href: 'http://facebook.com', Icon: Facebook },
		{ href: 'http://twitter.com', Icon: Twitter },
		{ href: 'http://youtube.com', Icon: Youtube }
	];
</script>

<Meta />
<section class="home">
	<div class="hero">
		<img src="/hero-1.png" alt="hero1" />
	</div>

	<div class="popular">
		<h1>Most Popular</h1>

		<ShopCards {products} noSpacing />
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
		@apply mx-[4vw] lg:mx-[7vw];
		@apply flex flex-col gap-10;
		.hero {
			@apply mt-6  flex h-[51vw] items-center justify-center overflow-hidden rounded-lg lg:h-full;

			> img {
				@apply h-full w-full bg-blue-100  object-cover object-center;
				// aspect-ratio: 1/1.5;
			}
		}
		.popular {
			> h1 {
				@apply mb-5 text-center;
			}
		}
	}
	footer {
		@apply relative py-6;
		@apply mx-[4vw] lg:mx-[7vw];

		> div {
			@apply flex flex-col items-center  justify-center gap-4 rounded-lg border  bg-white p-6 drop-shadow-xl lg:flex-row lg:gap-8;
			.socials {
				@apply flex gap-4;
			}
		}
	}
</style>

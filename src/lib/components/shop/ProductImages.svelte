<script lang="ts">
	import type { IImages } from '@/schemas';

	export let id: number;
	export let images: IImages[];
	let selectedImg = 0;
</script>

<div class="imgs">
	<div class="main" class:full={images.length === 1}>
		{#each images as { url: src, alt }, i}
			<img
				{src}
				{alt}
				style:--image={i === 0 ? `image-${id}` : ''}
				style:--i={i}
				style:--z={~i}
				style:--selected={selectedImg}
			/>
		{/each}
	</div>
	{#if images.length > 1}
		<div class="gallery" style:--imgNo={images.length}>
			{#each images as { url: src, alt }, i}
				<img {src} {alt} on:click={() => (selectedImg = i)} />
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.imgs {
		@apply flex flex-col justify-between overflow-hidden;

		.main {
			@apply relative flex w-full overflow-hidden rounded-lg;
			height: 87%;
			&.full {
				@apply h-full;
			}
			> img {
				z-index: var(--z);
				view-transition-name: var(--image);
				transform: translateX(calc((var(--i) - var(--selected)) * 100%));
				@apply absolute h-full  w-full rounded-lg bg-slate-50 object-contain object-center  transition-transform;
			}
		}
		.gallery {
			height: 12%;
			@apply flex gap-2;
			> img {
				@apply aspect-square cursor-pointer rounded-sm object-contain object-center;
			}
		}
	}
</style>

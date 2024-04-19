<script lang="ts">
	export let id: number;
	let alt = 'a';
	const images = [
		'/defaultCardImg.avif',
		'https://picsum.photos/1000/1000',
		'https://picsum.photos/900/900'
	];
	let selectedImg = 0;
</script>

<div class="imgs">
	<div class="main">
		{#each images as image, i}
			<img
				src={image}
				{alt}
				style:--image={i === 0 ? `image-${id}` : ''}
				style:--i={i}
				style:--selected={selectedImg}
			/>
		{/each}
	</div>
	<div class="gallery" style:--imgNo={images.length}>
		{#each images as src, i}
			<img {src} {alt} on:click={() => (selectedImg = i)} />
		{/each}
	</div>
</div>

<style lang="scss">
	.imgs {
		@apply flex h-full flex-col justify-between overflow-hidden;
		.main {
			@apply relative flex w-full;
			height: 87%;
			> img {
				view-transition-name: var(--image);
				transform: translateX(calc((var(--i) - var(--selected)) * 100%));
				@apply absolute h-full w-full rounded-lg object-cover object-center transition-transform;
			}
		}
		.gallery {
			height: 12%;
			@apply flex gap-2;
			> img {
				@apply cursor-pointer rounded-lg object-cover object-center;
			}
		}
	}
</style>

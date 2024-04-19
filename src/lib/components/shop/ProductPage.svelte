<script>
	import ProductImages from '@/components/shop/ProductImages.svelte';

	let { id, src, alt, title, subtitle } = {
		id: 1,
		src: '/defaultCardImg.avif',
		alt: '',
		title: 'asd',
		subtitle: 'asd'
	};
</script>

<section style:--card="card-{id}">
	<ProductImages  {id} />
	<div class="info">
		<div class="title">
			<h1>{title}</h1>
			<p>{subtitle}</p>
		</div>
		<div class="desc">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dolorem maxime, minima
			iure eligendi accusantium magni doloribus saepe illum. Nulla expedita doloribus
			cumque architecto, aliquam recusandae velit quaerat sint quo inventore totam dolorem
			laudantium odit, deleniti soluta consequuntur eveniet est? Ab consequatur nam
			quaerat suscipit culpa, voluptas iusto facere laboriosam?
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

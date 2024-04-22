<script lang="ts">
	export let id: number;
	export let price: string;
	export let src: string;
	export let alt: string;
	export let name: string;
</script>

<a href={`/shop/${id}`} style:--card="card-{id}">
	<img {src} {alt} style:--image="image-{id}" />
	<div>
		<h4>{name}</h4>
		<p>${price}</p>
	</div>
</a>

<style lang="scss">
	a {
		@apply rounded-lg border bg-white text-card-foreground shadow-md;
		@apply flex cursor-pointer flex-col gap-4 p-4;
		view-transition-name: var(--card);
		animation-duration: 4s;

		> div {
			@apply flex;
		}

		> img {
			@apply w-full rounded-lg;
			@apply aspect-square object-contain;
			view-transition-name: var(--image);
		}
		> div {
			@apply flex items-center justify-between gap-1 text-xl;
			> h4 {
				@apply w-10/12 overflow-hidden text-ellipsis text-nowrap text-xl font-semibold;
			}
		}
	}
</style>

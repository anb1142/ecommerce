<script lang="ts">
	export let id: number;
	export let src: string;
	export let alt: string;
	export let name: string;
</script>

<a href={`/shop/${id}`} style:--card="card-{id}">
	<img {src} {alt} style:--image="image-{id}" />
	<div>
		<h4>{name}</h4>
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
			@apply aspect-square object-cover;
			view-transition-name: var(--image);
		}
		> div {
			@apply flex flex-col gap-1;
			> h4 {
				@apply text-xl font-semibold;
			}
			> p {
				@apply text-sm;
			}
		}
	}
</style>

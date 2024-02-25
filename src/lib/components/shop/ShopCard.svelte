<script lang="ts">
	export let src: string;
	export let alt: string;
	export let title: string;
	export let subtitle: string;
</script>

<article>
	<img {src} {alt} />
	<div>
		<h4>{title}</h4>
		<p>{subtitle}</p>
	</div>
</article>

<style lang="scss">
	article {
		@apply rounded-lg border bg-card text-card-foreground shadow-md;
		@apply flex flex-col gap-4 p-4;
		> img {
			@apply w-full rounded-lg;
			@apply aspect-square object-cover;
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

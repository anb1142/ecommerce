<script lang="ts">
	import { onMount } from 'svelte';
	import NavLinks from './NavLinks.svelte';
	import { onNavigate } from '$app/navigation';
	let scrolled = false;
	let end = false;

	const checkPositions = () => {
		scrolled = window.scrollY > 0;
		end = reachedEndofPage();
	};
	const reachedEndofPage = () =>
		document.body.offsetHeight === window.innerHeight ||
		(window.innerHeight + window.scrollY >= document.body.offsetHeight &&
			document.body.offsetHeight > window.innerHeight);

	onMount(() => {
		window.addEventListener('scroll', checkPositions);
	});
	onNavigate(checkPositions);
</script>

<nav class:scrolled class:end>
	<NavLinks />
</nav>

<style lang="scss">
	nav {
		--navInlineSpace: var(--inlinePadding);
		--navShrinkSpace: calc(var(--inlinePadding) + 1vh);
		--mobileCurvedSafeSpace: auto;

		@apply fixed z-50 flex items-center justify-between transition-all;
		@apply bottom-[--mobileCurvedSafeSpace] left-[--navInlineSpace] right-[--navInlineSpace] mt-[--defaultSpace] h-[--navHeight];
		@apply rounded-lg border border-border/50 drop-shadow-sm backdrop-blur-md;
		@apply bg-white/60 px-6;
		@apply md:bg-white md:px-12;

		&.scrolled {
			@apply bg-white/60;
			@apply md:left-[--navShrinkSpace] md:right-[--navShrinkSpace];
		}
	}
	@media screen and (max-width: 768px) {
		nav {
			--navInlineSpace: var(--navShrinkSpace);
			--mobileCurvedSafeSpace: 1.5rem;
			&.end {
				--navInlineSpace: 3vw;
				@apply bg-white md:bg-white/60;
			}
		}
	}
</style>

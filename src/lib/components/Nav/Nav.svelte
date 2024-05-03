<script lang="ts">
	import { onMount } from 'svelte';
	import NavLinks from './NavLinks.svelte';
	let scrolled = false;
	let end = false; // TODO doesn't work in mobile
	onMount(() => {
		window.addEventListener('scroll', () => {
			scrolled = window.scrollY > 0;
			end =
				window.innerHeight + window.scrollY === document.body.offsetHeight &&
				document.body.offsetHeight > window.innerHeight;
		});
	});
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
		&.end {
			--navInlineSpace: 3vw;
			@apply bg-white md:bg-white/60;
		}
	}
	@media screen and (max-width: 768px) {
		nav {
			--navInlineSpace: var(--navShrinkSpace);
			--mobileCurvedSafeSpace: 1.5rem;
		}
	}
</style>

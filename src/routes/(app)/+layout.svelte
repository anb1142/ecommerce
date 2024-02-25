<script>
	import { page } from '$app/stores';

	$: pathname = $page.url.pathname;
	const links = ['Shop', 'Contact Us', 'About'];
</script>

<header>
	<nav>
		<a href="/"><img src="/logo.svg" alt="logo" /></a>
		<div>
			{#each links as link}
				{@const href = '/' + link.toLowerCase().replaceAll(' ', '-')}
				<a {href} class={pathname === href ? 'active' : ''}>{link}</a>
			{/each}
		</div>
	</nav>
</header>
<div class="spacing"></div>
<main>
	<slot />
</main>

<style lang="scss">
	header {
		> nav {
			@apply fixed flex items-center justify-between;
			@apply z-50 h-14 w-full px-12;
			@apply bg-white/60  backdrop-blur-sm;
			@apply border-y border-border/40 border-t-transparent;
			> a > img {
				@apply h-8;
			}
			> div {
				@apply flex gap-8;
				> a {
					@apply text-sm opacity-60 hover:opacity-80;
					&.active {
						@apply opacity-100;
					}
				}
			}
		}
	}
	.spacing {
		@apply h-14;
	}
</style>

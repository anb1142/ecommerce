<script>
	import '../app.pcss';
</script>

<svelte:head>
	<title>E Commerce</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
		rel="stylesheet"
	/>
	<link rel="shortcut icon" href="/logo.svg" type="image/x-icon" />
</svelte:head>

<main>
	<slot />
</main>

<style lang="scss">
	* {
		font-family: 'Inter';
	}

	main {
		@apply h-svh bg-slate-50;
	}
</style>

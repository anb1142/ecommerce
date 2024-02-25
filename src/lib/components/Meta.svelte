<script>
	export let title = '';
	export let suffix = 'Shop';
</script>

<svelte:head>
	<title>{title ? title + ' | ' : ''}{suffix}</title>
</svelte:head>

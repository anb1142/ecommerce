<script>
	import { enhance } from '$app/forms';
	import { Button } from '@/components/ui/button';
	export let btn = 'Submit';
	export let inclFile = false;
</script>

<form
	method="POST"
	class="gap-4"
	{...$$props}
	enctype={inclFile ? 'multipart/form-data' : 'application/x-www-form-urlencoded'}
	use:enhance
>
	<slot />
	<Button type="submit">{btn}</Button>
</form>

<style lang="scss">
	form {
		@apply flex w-full flex-col;
	}
</style>

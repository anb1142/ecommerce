<script>
	import { enhance } from '$app/forms';
	import { Button } from '@/components/ui/button';
	export let btn = 'Submit';
</script>

<form method="POST" class="gap-4" {...$$props} use:enhance>
	<slot />
	<Button type="submit">{btn}</Button>
</form>

<style lang="scss">
	form {
		@apply flex w-full flex-col;
	}
</style>

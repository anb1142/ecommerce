<script lang="ts">
	import { page } from '$app/stores';
	import { objToParams } from '@/utils/objToParams';
	import { Edit, Trash2 } from 'lucide-svelte';
	export let id: string;
	page;
</script>

<div>
	<a href={objToParams({ delete: id })}>
		<Trash2 class="text-red-500" />
	</a>
	<a href={`/admin/${$page.params.table}/edit?id=${id}`}>
		<Edit />
	</a>
</div>

<style lang="scss">
	div {
		@apply flex h-full justify-center gap-3;
		> a {
			@apply transition-transform hover:scale-110;
		}
	}
</style>

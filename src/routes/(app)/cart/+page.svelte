<script lang="ts">
	import Meta from '@/components/Meta.svelte';
	import Cart from '@/components/shop/Cart/Cart.svelte';
</script>

<Meta title="Cart" />
<section><Cart /></section>

<style lang="scss">
	section {
		@apply px-0 lg:px-[10vw];
	}
</style>

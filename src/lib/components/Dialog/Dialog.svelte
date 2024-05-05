<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { objToParams } from '@/utils/objToParams';
	import toTitleCase from '@/utils/totitleCase';
	import { X } from 'lucide-svelte';
	import Button from '../ui/button/button.svelte';
	import { enhance } from '$app/forms';

	export let name: string;
	export let w: string = '50vh';
	export let confirm: Function | undefined = undefined;
	export let phrase: string | undefined = undefined;
	let opened = true;
	let dialog: HTMLDialogElement;

	const goBack = () => goto($page.url.pathname + objToParams({ [name]: undefined }));

	const confirmed = () => {
		if (confirm) confirm();
		closeDialog();
	};

	const closeDialog = () => {
		dialog.setAttribute('closing', '');
		dialog.addEventListener(
			'animationend',
			() => {
				dialog.removeAttribute('closing');
				goBack();
			},
			{ once: true }
		);
	};

	$: opened = !!$page.url.searchParams.get(name);

	$: {
		if (dialog)
			if (opened) dialog.showModal();
			else dialog.close();
	}
	// TODO: animation when pressing escape
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:click|self={closeDialog} on:close={goBack} style:--w={w}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<button on:click={closeDialog}><X /></button>
		<h3>{phrase || `Are you sure you want to ${toTitleCase(name)}?`}</h3>
		<slot />
		{#if confirm}
			<form class="buttons" method="POST" use:enhance>
				<Button type="submit" on:click={confirmed}>Yes</Button>
				<Button variant="outline" on:click={closeDialog}>No</Button>
			</form>
		{/if}
	</div>
</dialog>

<style lang="scss">
	:root {
		--bg: #fff;
		--bodybg: #0099ff;
		--fc: #222;
	}

	dialog {
		max-width: 90vw;
		@apply m-auto   rounded-lg border bg-white text-lg shadow-lg;
		width: var(--w);
		&::backdrop {
			@apply fixed inset-0 z-50 bg-background/0;
			animation: fadein 300ms forwards;
		}
		&[open] {
			animation: popopen 300ms forwards;
		}
		> div {
			@apply p-7;
		}
		.buttons {
			@apply mt-4 flex justify-end gap-4;
		}
		button {
			border: 0;
			outline: 0;
			@apply absolute right-2 top-2 cursor-pointer rounded-full bg-none text-lg opacity-60 transition-colors;
			&:hover {
				@apply bg-black text-sm text-white;
			}
		}
	}
	:global(dialog[closing]) {
		pointer-events: none;
		animation: closepopup 200ms !important;
	}

	:global(dialog[closing]::backdrop) {
		animation: fadeout 200ms !important;
	}

	@keyframes closepopup {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(100vh) scale(0.9);
		}
	}

	@keyframes popopen {
		0% {
			transform: translateY(-100vh) scale(0.6);
		}
		60% {
			transform: translateY(3vh) scale(1);
		}
		100% {
			transform: translateY(0) scale(1);
		}
	}
	//TODO
	// @keyframes fadein {
	// 	0% {
	// 		@apply bg-background/0 backdrop-blur-0;
	// 	}
	// 	100% {
	// 		@apply bg-background/80 backdrop-blur-sm;
	// 	}
	// }

	// @keyframes fadeout {
	// 	0% {
	// 		@apply bg-background/80 backdrop-blur-sm;
	// 	}
	// 	100% {
	// 		@apply bg-background/0 backdrop-blur-0;
	// 	}
	// }
</style>

<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Dialog from '@/components/Dialog/Dialog.svelte';
	import QuickForm from '@/components/QuickForm.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import type { IImages } from '@/schemas/index.js';
	import { objToParams } from '@/utils/objToParams';
	import { Plus } from 'lucide-svelte';
	export let data;

	let productImages: IImages[] = data.productImages;
	let addedImageIds: number[] = data.addedImageIds;
	$: selectableImages = data.allImages.filter((img) => !addedImageIds.includes(img.id));

	const addImage = (id: number) => {
		if (addedImageIds.includes(id)) return;
		addedImageIds = [...addedImageIds, id];
		productImages = data.allImages.filter((i) => addedImageIds.includes(i.id));
		goto($page.url.pathname + objToParams({ addImg: undefined }));
	};
</script>

{#if data.productImages.length > 0}
	<form class="visibleForm" action="?/setVisible" method="POST" use:enhance>
		<input type="hidden" value={data.id} name="id" />
		<input type="hidden" value={data.visible ? 0 : 1} name="visibility" />
		<Button type="submit">Set {data.visible ? 'Hidden' : 'Visible'}</Button>
	</form>
{/if}

<QuickForm fields={data.fields} action="edit">
	<input type="hidden" name="id" value={data.id} />
	<input type="hidden" name="addImgs" value={addedImageIds.toString()} />
	<p>Images</p>
	<div class="gallery">
		{#each productImages as { url: src, alt, id }}
			<img {src} {alt} />
		{/each}
		{#if selectableImages.length > 0}
			<a href={objToParams({ addImg: 'true' })} class="addImg">
				<Plus class="size-8" />
			</a>
		{/if}
	</div>
</QuickForm>

{#if selectableImages.length > 0}
	<Dialog name="addImg" phrase="Add Image" confirm={undefined} w="60rem">
		<div class="allImages">
			{#each selectableImages as { url: src, alt, id }}
				{#if !addedImageIds.includes(id)}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<img {src} {alt} on:click={() => addImage(id)} />
				{/if}
			{/each}
		</div>
	</Dialog>
{/if}

<style lang="scss">
	.visibleForm {
		@apply absolute  flex;
		margin-top: -4.8rem;
		margin-left: 18.5rem;
	}
	.gallery {
		@apply flex gap-2;
		> * {
			@apply size-32 rounded-sm object-cover object-center;
		}
		> .addImg {
			@apply flex size-32  items-center justify-center bg-slate-300 opacity-90 transition-transform;
			&:hover {
				@apply scale-105 opacity-100;
			}
		}
	}
	.allImages {
		@apply mt-4 grid place-items-center gap-4;
		grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));

		> img {
			@apply size-64 cursor-pointer rounded-md bg-slate-200 object-contain object-center p-2 shadow-md;
		}
	}
</style>

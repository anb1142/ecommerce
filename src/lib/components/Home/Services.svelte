<script lang="ts">
	import { Wrench, Truck, Gauge, Headset } from 'lucide-svelte';

	type IService = { service: string; description: string; icon: typeof Wrench };
	const services: IService[] = [
		{
			service: 'Delivery',
			description: 'In 2-Days',
			icon: Truck
		},
		{
			service: 'Fast PCs',
			description: 'Efficient',
			icon: Gauge
		},
		{
			service: 'Support',
			description: '24/7',
			icon: Headset
		},
		{
			service: 'Repairs',
			description: 'Reliable',
			icon: Wrench
		}
	];
</script>

<section>
	<h1>Services</h1>
	<div class="services">
		{#each services as { service, description, icon: Icon }}
			<div>
				<div class="icon">
					<Icon class="size-full" strokeWidth="1.25" />
				</div>
				<h4>{service}</h4>
				<p>{description}</p>
			</div>
		{/each}
	</div>
</section>

<style lang="scss">
	section {
		@apply flex flex-col gap-6;
		> h1 {
			@apply text-center;
		}
		.services {
			@apply flex  flex-wrap justify-evenly gap-4 py-2;
			> div {
				@apply flex flex-col items-center gap-4 rounded-lg  border  p-8 px-8 lg:px-12;

				.icon {
					@apply size-24 rounded-lg bg-white px-6 text-purple-500;
					box-shadow: 0.1vh 1vh 3vh rgba(85, 85, 85, 0.2);
				}
			}
		}
	}
</style>

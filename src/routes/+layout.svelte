<script lang="ts">
	import './styles.scss';
	import { type Snippet } from 'svelte';
	import { asset } from '$app/paths';
	let { children }: { children: Snippet<[]> } = $props();

	const resolved = asset("/favicon.png");
	const resolved1 = asset("/bootstrap/bootstrap.min.css");
	const resolved2 = asset("/bootstrap/bootstrap-icons.min.css");
	const resolved3 = asset("/bootstrap/bootstrap.bundle.min.js");
</script>

<svelte:head>
	<link rel="icon" type="image/svg" href={resolved} />
	<title>Study Helper</title>
	<meta name="description" content="Questioner rotator" />
	<link rel="stylesheet" href={resolved1} />
	<link rel="stylesheet" href={resolved2} />
	<script src={resolved3} defer></script>
</svelte:head>

<div class="container rounded">
	<div class="my-5 p-3">
		{@render children()}
	</div>
</div>

<style>
	.container {
		background-color: rgb(150, 150, 150);
	}
</style>
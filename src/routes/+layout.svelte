<script lang="ts">
	import './styles.scss';
	import { type Snippet } from 'svelte';
	let { children }: { children: Snippet<[]> } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/svg" href="/facicon.png" />
	<title>Study Helper</title>
	<meta name="description" content="Questioner rotator" />
	<link rel="stylesheet" href="/bootstrap/bootstrap.min.css" />
	<link rel="stylesheet" href="/bootstrap/bootstrap-icons.min.css" />
	<script src="/bootstrap/bootstrap.bundle.min.js" defer></script>
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
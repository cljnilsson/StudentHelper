<script lang="ts">
	//import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import {Elteknik, type Subject} from "$lib/data.svelte";

	let history: string[] = $state([]);
	let currentQuestion: string | undefined = $state(undefined);
	let showAll: boolean = $state(false);
	let currentSubject: Subject = Elteknik;
	//let index: number = $state(1);

	function pool(): string[] {
		return currentSubject.chapters.filter((k) => k.enabled).flatMap((k) => k.questions);
	}

	function gen(): string | undefined {
		const totalPool: string[] = pool();
		let result =
			totalPool.length > 0 ? totalPool[Math.floor(Math.random() * totalPool.length)] : undefined;

		return result;
	}

	function start() {
		currentQuestion = gen();

		if (currentQuestion) {
			history = [...history, currentQuestion];
		}
	}

	function next() {
		let newQuestion = gen();

		// Prevent same question twice in a row
		while (newQuestion === currentQuestion) {
			newQuestion = gen();
		}

		currentQuestion = newQuestion;

		if (currentQuestion) {
			history = [...history, currentQuestion];
		}
	}

	function previous() {}

	function growFade(node: Element, { duration = 200, start = 0.85, easing = cubicOut } = {}) {
		return {
			duration,
			easing,
			css: (t: number) => {
				const scale = start + t * (1 - start);
				return `
				transform: scale(${scale});
				opacity: ${t};
			`;
			}
		};
	}
</script>

<div class="row">
	<div class="col-xl-auto col-md-6 col-12 border-end">
		{#each currentSubject.chapters as k (k.name)}
			<input type="checkbox" bind:checked={k.enabled} /> {k.name} <br />
		{/each}
	</div>
	<div class="col">
		{#if !currentQuestion}
			<div class="text-center">
				<button class="btn btn-lg btn-primary" onclick={start}>Start</button>
			</div>
		{:else}
			<p>Questions: {pool().length}</p>
			<div class="my-5">
				{#key currentQuestion}
					<h4>
						{#if currentQuestion}
							{@const chapter = currentSubject.chapters.find((k) => k.questions.includes(currentQuestion ?? ""))}
							{chapter?.name} - {chapter?.subtitle}
						{/if}
					</h4>
					<h5 in:growFade={{ duration: 200, start: 0.85, easing: cubicOut }}>
						{currentQuestion}
					</h5>
				{/key}
			</div>
			<div class="text-center my-5">
				<button class="btn btn-secondary mx-3" disabled={history.length === 0 || true}
					>Previous</button
				><button class="btn btn-primary mx-3" onclick={next}>Next</button>
			</div>
			<button class="btn btn-primary mt-5" onclick={() => showAll = !showAll}>{showAll ? "Hide" : "Show"} All Questions</button>
			{#if showAll}
				<div class="pt-5">
					{#each pool() as p (p)}
						<p>{p}</p>
					{/each}
				</div>
			{/if}
		{/if}
	</div>
</div>

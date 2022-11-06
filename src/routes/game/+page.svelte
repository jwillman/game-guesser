<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import type { GameData } from './+page';

	export let data: GameData;

	let guessValue: string;
	let won: boolean = false;

	function guess() {
		if (guessValue?.trim() === data.title) {
			won = true;
		}
		console.log(guessValue);
	}
</script>

<div class="game">
	<img src={data.url} alt="Cover art" />
	<form on:submit|preventDefault>
		<input bind:value={guessValue} type="text" placeholder="The name of the game" />
		<button on:click={guess}>Guess</button>
	</form>
</div>

{#if won}
	<div
		style="position: absolute; left: 50%; top: 30%"
		use:confetti={{
			force: 0.7,
			stageWidth: window.innerWidth,
			stageHeight: window.innerHeight,
			colors: ['#ff3e00', '#40b3ff', '#676778']
		}}
	/>
{/if}

<style>
	.game {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	input {
		width: 20rem;
		margin-top: 2rem;
	}
</style>

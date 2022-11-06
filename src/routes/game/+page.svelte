<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import type { GameData } from './+page';
	import { pixelateImage } from './pixelateImage';
	import { onMount } from 'svelte';

	export let data: GameData;

	enum GameState {
		Won,
		Lost,
		Undecided
	}
	let gameState: GameState = GameState.Undecided;

	let guessValue: string;
	let won: boolean = false;
	let lost: boolean = false;
	let pixelationFactor = 25;

	onMount(() => {
		pixelateImage({
			originalImage: document.querySelector('#sourceImage'),
			pixelatedImage: document.querySelector('#pixelatedImage'),
			pixelationFactor: pixelationFactor
		});
	});

	function guess() {
		if (gameState === GameState.Lost) {
			return;
		}

		if (guessValue?.trim().toLowerCase() === data.title.trim().toLowerCase()) {
			pixelateImage({
				originalImage: document.querySelector('#sourceImage'),
				pixelatedImage: document.querySelector('#pixelatedImage'),
				pixelationFactor: 1
			});
			gameState = GameState.Won;
		} else {
			if (pixelationFactor > 1) {
				pixelationFactor -= 5;
			} else {
				gameState = GameState.Lost;
			}

			pixelateImage({
				originalImage: document.querySelector('#sourceImage'),
				pixelatedImage: document.querySelector('#pixelatedImage'),
				pixelationFactor: pixelationFactor
			});
		}
	}
</script>

<div class="game">
	<img id="sourceImage" src={data.url} alt="Cover art" style="display:none" />
	<img id="pixelatedImage" src={data.url} alt="Cover art" />
	<form on:submit|preventDefault>
		<input bind:value={guessValue} type="text" placeholder="The name of the game" />
		<button on:click={guess}>Guess</button>
	</form>
	{#if gameState === GameState.Won}
		<span id="statusPrompt">You guessed correctly!</span>
	{/if}
	{#if gameState === GameState.Lost}
		<span id="statusPrompt">You didn't guess correctly!</span>
	{/if}
</div>

{#if gameState === GameState.Won}
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

	#lostPrompt {
		margin-top: 2rem;
	}

	input {
		width: 20rem;
		margin-top: 2rem;
	}
</style>

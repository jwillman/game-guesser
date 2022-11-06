<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import type { GameData } from './+page.server';
	import { pixelateImage } from './pixelateImage';
	import { onMount } from 'svelte';

	export let data: GameData;

	console.log(data);

	enum GameState {
		Won,
		Lost,
		Undecided
	}
	let gameState: GameState = GameState.Undecided;

	// TODO suggest input values / guesses as player types them
	let guessValue: string;
	let pixelationFactor = 25;
	let guessIsWrong: boolean = false;

	onMount(() => {
		pixelateImage({
			originalImage: document.querySelector('#sourceImage'),
			pixelatedImage: document.querySelector('#pixelatedImage'),
			pixelationFactor: pixelationFactor
		});
	});

	function checkGuess() {
		if (gameState === GameState.Lost || gameState === GameState.Won) {
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

				pixelateImage({
					originalImage: document.querySelector('#sourceImage'),
					pixelatedImage: document.querySelector('#pixelatedImage'),
					pixelationFactor: pixelationFactor
				});
			} else {
				gameState = GameState.Lost;
			}
		}

		if (gameState === GameState.Undecided) {
			guessIsWrong = true;
			setTimeout(() => {
				guessIsWrong = false;
			}, 1000);
		}
	}
</script>

<div class="game">
	<img id="sourceImage" src={data.url} alt="Cover art" style="display:none" />
	<img id="pixelatedImage" src={data.url} alt="Cover art" />
	<form on:submit|preventDefault>
		<input
			class:error={guessIsWrong}
			bind:value={guessValue}
			type="text"
			placeholder="The name of the game"
		/>
		<button on:click={checkGuess}>Guess</button>
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

	#statusPrompt {
		margin-top: 2rem;
	}

	input {
		width: 20rem;
		margin-top: 2rem;
	}

	input.error {
		animation: shake 0.2s ease-in-out 0s 2;
		box-shadow: 0 0 0.5em red;
	}

	@keyframes shake {
		0% {
			margin-left: 0rem;
		}
		25% {
			margin-left: 0.5rem;
		}
		75% {
			margin-left: -0.5rem;
		}
		100% {
			margin-left: 0rem;
		}
	}
</style>

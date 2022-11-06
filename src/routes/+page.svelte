<script>
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>Try to guess the game based on cover art</h1>

	<h2>
		<a class="button" href="/game">Play</a>
	</h2>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.button {
		display: block;
		width: 115px;
		height: 25px;
		background: #4e9caf;
		padding: 10px;
		text-align: center;
		border-radius: 5px;
		color: white;
		font-weight: bold;
		line-height: 25px;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>

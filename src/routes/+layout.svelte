<script>
	import './styles.css';
	import github from '$lib/images/github.svg';
</script>

<div class="app">
	<main>
		<slot />
	</main>

	<footer>
		You can find the source code here:
		<a href="https://github.com/jwillman/game-guesser"><img src={github} alt="GitHub" /></a>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	footer img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>

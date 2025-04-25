<script>
	const { children } = $props();
</script>

<main>
	{@render children?.()}
</main>

<style>
	main {
		/* background-color: darkblue; */
		width: 90%;
		padding: 1rem;
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
</style>

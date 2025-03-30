<script lang="ts">
	interface Props {
		categoryName: string;
		score: number;
	}
	const { categoryName, score }: Props = $props();
</script>

<div class="category"><span>{categoryName}</span><span class="score">{score}</span></div>

<style>
	.category {
		display: flex;
		justify-content: space-between;
	}
	.score {
		padding: 0.1rem;
		background-color: black;
		border-radius: 0.1rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>

<script lang="ts">
	import type { StoredAnswer } from '$lib/services/game/types';

	interface Props {
		answer: StoredAnswer;
	}

	let { answer } = $props();
</script>

<div class="answer {answer.isVisible ? 'visible' : 'hidden'}">
	{#if answer.isVisible}
		<p>{answer.answer}</p>
		<p class="answer-score">{answer.value}</p>
	{:else}
		<p>?</p>
	{/if}
</div>

<style>
	div {
		background: hsla(245, 98%, 50%, 1);

		background: linear-gradient(
			0deg,
			var(--color-main) 0%,
			var(--color-main-accent) 25%,
			var(--color-main-accent) 75%,
			var(--color-main) 100%
		);

		filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#1A05FC", endColorstr="#9D7FFF", GradientType=1 );
		border: 2px solid red;
		padding: 1rem;
		border: 0.2rem solid var(--color-highlight);
		border-radius: 0.1rem;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
	}
	p {
		text-align: center;
		font-size: 1.5rem;
	}
	.hidden {
		justify-content: center;
	}
	.visible {
		background: var(--color-main-accent);
	}
	.answer-score {
		color: var(--color-secondary-text);
		background: black;
		border-radius: 50%;
		padding: 0.5rem;
	}
</style>

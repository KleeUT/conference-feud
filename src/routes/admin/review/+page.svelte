<script lang="ts">
	import Heading from '$lib/components/heading.svelte';
	import Margin from '$lib/components/margin.svelte';
	import Category from './category.svelte';
	import AnswerMappingDisplay from './answer-mapping-display.svelte';

	const { data } = $props();
	const { question } = data;
	const { topMapped } = question;
	const topCategories = Object.entries(topMapped).sort((x, y) => y[1] - x[1]);
</script>

<div class="container">
	<Heading level="1" size="2">{data.question.questionText}</Heading>
	<nav class="question_nav">
		{#if data.previousQuestion}
			<span>
				<a href="/admin/review?questionId={data.previousQuestion.questionId}">
					⬅️ {data.previousQuestion.questionText}
				</a>
			</span>
		{/if}
		&nbsp;
		{#if data.nextQuestion}
			<span>
				<a href="/admin/review?questionId={data.nextQuestion.questionId}">
					{data.nextQuestion.questionText} ➡️
				</a>
			</span>
		{/if}
	</nav>
	<Margin marginTop="1">
		<section class="main">
			<AnswerMappingDisplay answers={data.question.answers} questionId={data.question.questionId} />
			<section>
				<Heading level="2" size="4">Top categories</Heading>
				<Margin marginTop="1">
					<div class="categories">
						{#each topCategories as [categoryName, score]}
							<Category {categoryName} {score} />
						{/each}
					</div>
				</Margin>
			</section>
		</section>
	</Margin>
</div>

<style>
	.question_nav {
		display: flex;
		justify-content: space-between;
	}

	.container {
		width: 90vw;
		display: flex;
		flex-direction: column;
		margin: auto;
		background-color: darkblue;
		height: 100vh;
		padding: 1rem;
	}

	.main {
		gap: 1rem;
		display: grid;
		grid-template-columns: 3fr 1fr;
	}

	.categories {
		display: flex;
		flex-direction: column;
		width: 80%;
		margin: auto;
		gap: 0.5rem;
	}
</style>

<script lang="ts">
	import Heading from '$lib/components/heading.svelte';
	import Margin from '$lib/components/margin.svelte';
	import TextInput from '$lib/components/text-input.svelte';
	import Category from './category.svelte';

	const { data } = $props();
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
			<table>
				<thead>
					<tr>
						<th>Answer</th><th>Count</th><th>Group</th>
					</tr>
				</thead>
				<tbody>
					{#each data.question.answers as answer}
						<tr>
							<td>{answer.answer}</td><td>{answer.count}</td>
							<td>
								<TextInput value={answer.answer} />
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<section>
				<Heading level="2" size="4">Top categories</Heading>
				<Margin marginTop="1">
					<div class="categories">
						<Category categoryName="Category 1" score={80} />
						<Category categoryName="Category 2" score={65} />
						<Category categoryName="Category 3" score={53} />
						<Category categoryName="Category 4" score={45} />
						<Category categoryName="Category 5" score={30} />
						<Category categoryName="Long category name" score={20} />
						<Category categoryName="Category 7" score={10} />
						<Category categoryName="Category 8" score={8} />
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
	.categories {
		display: flex;
		flex-direction: column;
		width: 80%;
		margin: auto;
		gap: 0.5rem;
	}

	.main {
		gap: 1rem;
		display: grid;
		grid-template-columns: 3fr 1fr;
	}
</style>

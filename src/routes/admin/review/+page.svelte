<script lang="ts">
	import Heading from '$lib/components/heading.svelte';
	import TextInput from '$lib/components/text-input.svelte';

	const { data } = $props();
</script>

<div class="container">
	<section>
		<Heading level="1" size="2">{data.question.questionText}</Heading>
		<nav class="question_nav">
			{#if data.previousQuestion}
				<span>
					<a href="/admin/review?questionId={data.previousQuestion.questionId}">
						⬅️ {data.previousQuestion.questionText}
					</a>
				</span>
			{/if}
			|
			{#if data.nextQuestion}
				<span>
					<a href="/admin/review?questionId={data.nextQuestion.questionId}">
						{data.nextQuestion.questionText} ➡️
					</a>
				</span>
			{/if}
		</nav>
		<section>
			<Heading level="2" size="4">Top categories</Heading>
			<div class="categories">
				<div class="category"><span>Category 1 </span><span> 80</span></div>
				<div class="category"><span>Category 2 </span><span> 65</span></div>
				<div class="category"><span>Category 3 </span><span> 53</span></div>
				<div class="category"><span>Category 4 </span><span> 45</span></div>
				<div class="category"><span>Category 5 </span><span> 30</span></div>
				<div class="category"><span>Category 6 </span><span> 20</span></div>
				<div class="category"><span>Category 7 </span><span> 10</span></div>
				<div class="category"><span>Category 8 </span><span> 8</span></div>
			</div>
		</section>
		<hr />
		<table>
			<thead>
				<tr>
					<th>Answer</th><th>Count</th><th>Group</th>
				</tr>
			</thead>
			<tbody>
				{#each data.question.answers as answer}
					<tr>
						<td>{answer.answer}</td><td>{answer.count}</td><td
							><TextInput value={answer.answer} /></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
</div>

<style>
	.question_nav {
		display: flex;
		justify-content: space-between;
	}
	.container {
		width: 80vw;
		display: flex;
		flex-direction: column;
		margin: auto;
		background-color: darkblue;
		height: 100vh;
		padding: 1rem;
	}
	.categories {
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 80%;
		margin: auto;
		gap: 0.5rem;
	}
	.category {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem;
		border: 2px solid yellow;
		border-radius: 0.2rem;
	}
</style>

<script lang="ts">
	import Heading from '$lib/components/heading.svelte';
	import TextInput from '$lib/components/text-input.svelte';

	const { data } = $props();
</script>

<div class="container">
	<section>
		<Heading level="1" size="2">{data.question.questionText}</Heading>
		<div class="question_nav">
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
		</div>
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
</style>

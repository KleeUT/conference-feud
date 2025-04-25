<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import TextInput from '$lib/components/text-input.svelte';

	interface Props {
		answers: Array<{
			answer: string;
			count: number;
			mapping?: string;
		}>;
		questionId: string;
	}
	const { answers, questionId }: Props = $props();
</script>

<table>
	<thead>
		<tr>
			<th>Answer</th><th>Count</th><th>Group</th>
		</tr>
	</thead>
	<tbody>
		{#each answers as answer}
			<tr>
				<td>{answer.answer}</td><td>{answer.count}</td>
				<td>
					<form method="post">
						<div class="group-update">
							<TextInput value={questionId} name="questionId" hidden />
							<TextInput value={answer.answer} name="answerText" hidden />
							<TextInput value={answer.mapping} name="newMapping" />
							<Button type="submit">💾</Button>
						</div>
					</form>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	.group-update {
		display: grid;
		grid-template-columns: auto 50px;
	}
	tr {
		margin-top: 0.5rem;
	}
</style>

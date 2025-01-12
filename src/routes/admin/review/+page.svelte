<script lang="ts">
	const { data } = $props();
</script>

{#each data.surveyResponses as response}
	<section>
		<h1>{response.questionId}</h1>
		<table>
			<thead>
				<tr>
					<th>Answer</th><th>Count</th>
				</tr>
			</thead>
			<tbody>
				{#each response.answers as answer}
					<tr>
						<td>{answer.answer}</td><td>{answer.count}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
{/each}

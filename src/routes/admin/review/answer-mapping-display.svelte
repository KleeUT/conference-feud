<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import TextInput from '$lib/components/text-input.svelte';
	import type { ChangeEventHandler } from 'svelte/elements';
	import Answer from '../../answer.svelte';
	interface Props {
		answers: Array<{
			answer: string;
			count: number;
			mapping?: string;
		}>;
		questionId: string;
	}
	const { answers }: Props = $props();
	const answersWithMapping: Array<Props['answers'][0] & { newMapping?: string }> = answers.map(
		(x) => ({ ...x, newMapping: 'x.mapping' })
	);
</script>

<table>
	<thead>
		<tr>
			<th>Answer</th><th>Count</th><th>Group</th>
		</tr>
	</thead>
	<tbody>
		{#each answersWithMapping as answer}
			<tr>
				<td>{answer.answer}</td><td>{answer.count}</td>
				<td>
					<div class="group-update">
						<TextInput bind:value={answer.newMapping} />
						<Button disabled={answer.newMapping === answer.mapping}
							>{answer.newMapping === answer.mapping ? ' ' : '💾'}
						</Button>
					</div>
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

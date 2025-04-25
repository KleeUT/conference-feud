<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import Heading from '$lib/components/heading.svelte';
	import Main from '$lib/components/main.svelte';
	import Margin from '$lib/components/margin.svelte';
	import TextInput from '$lib/components/text-input.svelte';

	interface Props {}

	const { data } = $props();
	const { question, hasNextQuestion } = data;
</script>

<div class="container">
	<Main>
		<Heading level="1" size="5">Conference Feud Survey</Heading>
		{#if question}
			<Heading level="2" size="2">{question?.questionText}</Heading>
			<form method="post">
				<TextInput hidden name="questionId" value={question.questionId}></TextInput>
				<Margin marginTop="1">
					<TextInput maxLength={50} name="answer" required></TextInput>
				</Margin>
				<Margin marginTop="1">
					<Button>
						{#if hasNextQuestion}Next{:else}Done{/if}
					</Button>
				</Margin>
			</form>
		{:else}
			<p>Thanks for contributing.</p>
		{/if}
	</Main>
</div>

<style>
	div.container {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>

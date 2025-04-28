<script>
	import Button from '$lib/components/button.svelte';
	import Main from '$lib/components/main.svelte';
	import Margin from '$lib/components/margin.svelte';
	import TextInput from '$lib/components/text-input.svelte';
	const { data } = $props();
</script>

<Main>
	<form method="post">
		<label>
			Question:
			<TextInput name="question" value={data.question.question} />
		</label>
		<hr />
		<div class="answers">
			<TextInput name="answer1Text" value={data.question.answers.answer1.text} />
			<TextInput name="answer1Value" value={data.question.answers.answer1.value.toString()} />
			<TextInput name="answer1Text" value={data.question.answers.answer2.text} />
			<TextInput name="answer1Value" value={data.question.answers.answer2.value.toString()} />
			<TextInput name="answer1Text" value={data.question.answers.answer3.text} />
			<TextInput name="answer1Value" value={data.question.answers.answer3.value.toString()} />
			<TextInput name="answer1Text" value={data.question.answers.answer4.text} />
			<TextInput name="answer1Value" value={data.question.answers.answer4.value.toString()} />
			<TextInput name="answer1Text" value={data.question.answers.answer5.text} />
			<TextInput name="answer1Value" value={data.question.answers.answer5.value.toString()} />
			<TextInput name="answer1Text" value={data.question.answers.answer6.text} />
			<TextInput name="answer1Value" value={data.question.answers.answer6.value.toString()} />
			<TextInput name="answer1Text" value={data.question.answers.answer7.text} />
			<TextInput name="answer1Value" value={data.question.answers.answer7.value.toString()} />
			<TextInput name="answer1Text" value={data.question.answers.answer8.text} />
			<TextInput name="answer1Value" value={data.question.answers.answer8.value.toString()} />
		</div>

		<Margin>
			<Button type="submit">Create Round</Button>
		</Margin>
	</form>
</Main>

<style>
	.answers {
		display: grid;
		grid-template-columns: 75% 25%;
		gap: 1rem 0;
	}
	hr {
		margin: 1rem;
	}
</style>

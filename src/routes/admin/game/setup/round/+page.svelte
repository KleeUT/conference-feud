<script>
	import ButtonLink from '$lib/components/button-link.svelte';
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
			<TextInput name="answer2Text" value={data.question.answers.answer2.text} />
			<TextInput name="answer2Value" value={data.question.answers.answer2.value.toString()} />
			<TextInput name="answer3Text" value={data.question.answers.answer3.text} />
			<TextInput name="answer3Value" value={data.question.answers.answer3.value.toString()} />
			<TextInput name="answer4Text" value={data.question.answers.answer4.text} />
			<TextInput name="answer4Value" value={data.question.answers.answer4.value.toString()} />
			<TextInput name="answer5Text" value={data.question.answers.answer5.text} />
			<TextInput name="answer5Value" value={data.question.answers.answer5.value.toString()} />
			<TextInput name="answer6Text" value={data.question.answers.answer6.text} />
			<TextInput name="answer6Value" value={data.question.answers.answer6.value.toString()} />
			<TextInput name="answer7Text" value={data.question.answers.answer7.text} />
			<TextInput name="answer7Value" value={data.question.answers.answer7.value.toString()} />
			<TextInput name="answer8Text" value={data.question.answers.answer8.text} />
			<TextInput name="answer8Value" value={data.question.answers.answer8.value.toString()} />
		</div>

		<Margin>
			<div class="buttons">
				<ButtonLink href="/admin/game/setup" type="secondary">Back</ButtonLink><Button type="submit"
					>Update question</Button
				>
			</div>
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
	.buttons {
		display: flex;
		gap: 1rem;
	}
</style>

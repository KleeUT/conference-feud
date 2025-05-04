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
			<TextInput name="question" value={data.question} />
		</label>
		<hr />
		<div class="answers">
			<TextInput name="answer1Id" hidden value={data.answers.answer1.id} />
			<TextInput name="answer1Text" value={data.answers.answer1.answer} />
			<TextInput name="answer1Value" value={data.answers.answer1.value.toString()} />
			<TextInput name="answer2Id" hidden value={data.answers.answer2.id} />
			<TextInput name="answer2Text" value={data.answers.answer2.answer} />
			<TextInput name="answer2Value" value={data.answers.answer2.value.toString()} />
			<TextInput name="answer3Id" hidden value={data.answers.answer3.id} />
			<TextInput name="answer3Text" value={data.answers.answer3.answer} />
			<TextInput name="answer3Value" value={data.answers.answer3.value.toString()} />
			<TextInput name="answer4Id" hidden value={data.answers.answer4.id} />
			<TextInput name="answer4Text" value={data.answers.answer4.answer} />
			<TextInput name="answer4Value" value={data.answers.answer4.value.toString()} />
			<TextInput name="answer5Id" hidden value={data.answers.answer5.id} />
			<TextInput name="answer5Text" value={data.answers.answer5.answer} />
			<TextInput name="answer5Value" value={data.answers.answer5.value.toString()} />
			<TextInput name="answer6Id" hidden value={data.answers.answer6.id} />
			<TextInput name="answer6Text" value={data.answers.answer6.answer} />
			<TextInput name="answer6Value" value={data.answers.answer6.value.toString()} />
			<TextInput name="answer7Id" hidden value={data.answers.answer7.id} />
			<TextInput name="answer7Text" value={data.answers.answer7.answer} />
			<TextInput name="answer7Value" value={data.answers.answer7.value.toString()} />
			<TextInput name="answer8Id" hidden value={data.answers.answer8.id} />
			<TextInput name="answer8Text" value={data.answers.answer8.answer} />
			<TextInput name="answer8Value" value={data.answers.answer8.value.toString()} />
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
	.buttons {
		display: flex;
		gap: 1rem;
	}
	.answers {
		display: grid;
		grid-template-columns: 75% 25%;
		gap: 1rem 0;
	}
	hr {
		margin: 1rem;
	}
</style>

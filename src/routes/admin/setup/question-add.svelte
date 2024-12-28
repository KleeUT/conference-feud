<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import TextInput from '$lib/components/text-input.svelte';
</script>

<form class="question-add" method="post" action="?/addQuestion">
	<TextInput value="Text Input" label="Question:" name="questionText" />
	<div class="mt1"></div>
	<Button>Add Question</Button>
</form>

<style>
	form.question-add {
		padding: 1rem;
		background: darkblue;
		color: white;
		display: flex;
		flex-direction: column;
		margin: 0;
		width: 100%;
	}
	.mt1 {
		margin-top: 1rem;
	}
</style>

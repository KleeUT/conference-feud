<script lang="ts">
	import type { PageData } from './$types';
	import QuestionEdit from './question-add.svelte';
	import Popover from '$lib/components/popover.svelte';
	import Button from '$lib/components/button.svelte';
	import Heading from '$lib/components/heading.svelte';
	import QuestionListItem from './question-list-item.svelte';
	const { data }: { data: PageData } = $props();
	const questions = data.questions;
</script>

<Popover popover={'auto'} id="questionedit">
	<QuestionEdit></QuestionEdit>
</Popover>

<main>
	<Heading level="1">Setup game</Heading>
	<Button popovertarget="questionedit">New Question</Button>
	{#each questions as question}
		<QuestionListItem text={question.text} id={question.id.value} />
	{/each}
</main>

<style>
	main {
		background-color: darkblue;
		width: 80%;
		padding: 1rem;
		margin: auto;
	}
</style>

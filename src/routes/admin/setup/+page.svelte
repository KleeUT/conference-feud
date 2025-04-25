<script lang="ts">
	import type { PageData } from './$types';
	import QuestionEdit from './question-add.svelte';
	import Popover from '$lib/components/popover.svelte';
	import Button from '$lib/components/button.svelte';
	import Heading from '$lib/components/heading.svelte';
	import QuestionListItem from './question-list-item.svelte';
	import Margin from '$lib/components/margin.svelte';
	const { data }: { data: PageData } = $props();
	const questions = data.questions;
</script>

<Popover popover={'auto'} id="questionedit">
	<QuestionEdit></QuestionEdit>
</Popover>

<main>
	<Heading level="1">Setup game</Heading>
	<Margin marginTop="1">
		<Button popovertarget="questionedit">New Question</Button>
		{#each questions as question}
			<Margin marginTop="1">
				<QuestionListItem text={question.text} id={question.id.value} />
			</Margin>
		{/each}
	</Margin>
</main>

<style>
	main {
		background-color: var(--color-main);
		width: 80%;
		padding: 1rem;
		margin: auto;
	}
</style>

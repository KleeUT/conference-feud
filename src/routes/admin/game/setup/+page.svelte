<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import Heading from '$lib/components/heading.svelte';
	import Main from '$lib/components/main.svelte';
	import TextInput from '$lib/components/text-input.svelte';

	const { data } = $props();
</script>

<Main align="left">
	<Heading level="1" size="1">Game Setup</Heading>
	<section>
		<Heading level="2" size="3">Teams</Heading>
		<form method="post" action="?setTeamName">
			<label>
				Team 1:
				<TextInput type="text" name="team1" value={data.teams.team1.name} />
			</label>
			<label>
				Team 2:
				<TextInput type="text" name="team1" value={data.teams.team2.name} />
			</label>
			<span>
				<Button type="submit">Update team names</Button>
			</span>
		</form>
	</section>
	<hr />
	<section>
		<Heading level="2" size="3">Questions</Heading>
		<ol>
			{#each data.questions as question}
				<li>
					<a href="/admin/game/setup/question/{question.questionId}">
						<p>{question.question}</p>
					</a>
				</li>
			{/each}
		</ol>
		<a href="/admin/game/setup/question"> New Question</a>
	</section>
</Main>

<style>
	form {
		display: flex;
		align-items: end;
		gap: 1rem;
	}
	hr {
		width: 100%;
		margin: 2rem 0;
	}
</style>

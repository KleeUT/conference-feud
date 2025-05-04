<script lang="ts">
	import ButtonLink from '$lib/components/button-link.svelte';
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
				<TextInput type="text" name="team1Name" value={data.gameState.team1Name} />
			</label>
			<label>
				Team 2:
				<TextInput type="text" name="team2Name" value={data.gameState.team2Name} />
			</label>
			<span>
				<Button type="submit">Update team names</Button>
			</span>
		</form>
	</section>
	<hr />
	<section>
		<Heading level="2" size="3">Rounds</Heading>
		<ol>
			{#each data.gameState.rounds as round}
				<li>
					<a href="/admin/game/setup/round/{round.id}">
						<p>{round.question}</p>
					</a>
				</li>
			{/each}
		</ol>
		<ButtonLink href="/admin/game/setup/round">New Round</ButtonLink>
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
	section {
		width: 100%;
		overflow: auto;
	}
	ol {
		margin-bottom: 1rem;
	}
</style>

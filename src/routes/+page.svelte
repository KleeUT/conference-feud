<script>
	import Heading from '$lib/components/heading.svelte';
	import Main from '$lib/components/main.svelte';
	import Margin from '$lib/components/margin.svelte';
</script>

<Main>
	<Heading level="1">SlashNEW Conference Feud</Heading>
	<p>For SlashNEW 2025 we're playing Conference Feud in the evening and need your help.</p>
	<p>
		We've got 10 short questions that we want your answers to. We'll correlate the answers and this
		evening we'll see who knows the audience better. Newcastle locals or the speakers we've brought
		in.
	</p>
	<p>
		The survey will only take a few minutes and you are free to interpret the questions however you
		like.
	</p>
	<Margin>
		<a href="/survey">Take the survey</a>
	</Margin>
	<p>We're not collecting any data other than what you put in the form.</p>
</Main>

<style>
	p {
		margin-top: 1rem;
	}
	a {
		/* background-color: var(--color-secondary); */
		background: linear-gradient(145deg, var(--color-secondary) 0%, var(--color-ternary) 100%);
		border-radius: 1rem;
		border: var(--color-highlight) solid 2px;
		text-decoration: none;
		padding: 1rem;
		display: block;
		margin: auto;
		text-align: center;
	}
</style>

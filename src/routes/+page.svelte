<script>
	import Board from './board.svelte';
	import ScoreBoard from './score-board.svelte';
</script>

<h1>Conference Feud</h1>
<ScoreBoard team1={{ name: 'Speakers', score: 45 }} team2={{ name: 'Sponsors', score: 102 }}
></ScoreBoard>
<div class="padding"></div>
<Board
	answers={[
		{ text: 'Answer 1', index: 1, visible: true },
		{ text: 'Answer 2', index: 2, visible: false },
		{ text: 'Answer 3', index: 3, visible: false },
		{ text: 'Answer 4', index: 4, visible: false },
		{ text: 'Answer 5', index: 5, visible: false },
		{ text: 'Answer 6', index: 6, visible: false },
		{ text: 'Answer 7', index: 7, visible: false },
		{ text: 'Answer 8', index: 8, visible: false }
	]}
></Board>

<style>
	.padding {
		height: 2rem;
	}
</style>

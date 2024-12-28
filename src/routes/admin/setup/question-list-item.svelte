<script lang="ts">
	import { QuestionId } from '$lib/types/question-id';

	interface Props {
		text: string;
		id: string;
	}
	let { text, id }: Props = $props();
</script>

<div class="question-list__container">
	<p>{text}</p>
	<form method="post" action="?/deleteQuestion">
		<input type="text" id="questionId" name="questionId" value={id} /><button>🗑️</button>
	</form>
</div>

<style>
	.question-list__container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	button {
		background-color: transparent;
		border: none;
		cursor: pointer;
	}
	#questionId {
		display: none;
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';

	let data = 'not yet';
	onMount(async () => {
		const res = await fetch('/event');
		if (!res.ok || !res.body) {
			data = 'http error' + res.body;
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
		while (true) {
			const { value, done } = await reader.read();
			if (done) break;
			console.log('received: ' + value);
			data = value;
		}
	});
</script>

{data}
<form method="post">
	<input type="text" name="eventValue" />
	<button type="submit">submit</button>
</form>

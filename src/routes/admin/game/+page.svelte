<!-- <script>
	import { onMount } from 'svelte';
	import { source } from 'sveltekit-sse';
	let value = source('/admin/game/api')
		.select('message')
		.json((e) => {
			console;
		});
	let d = '';
	onMount(() => {
		value.subscribe((update) => {
			d = update;
		});
	});
</script>

<h1>Game Admin</h1>

{new Date(d['data']).toLocaleTimeString()}
{JSON.stringify(d)} -->

<script lang="ts">
	import { onMount } from 'svelte';

	let data = 'not yet';
	onMount(async () => {
		const res = await fetch('/admin/game/api');
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

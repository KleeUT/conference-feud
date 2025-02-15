<script>
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
{JSON.stringify(d)}

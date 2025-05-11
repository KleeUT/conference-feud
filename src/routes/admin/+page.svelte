<script lang="ts">
	const { data } = $props();
</script>

<h1>Admin</h1>
<a href="/auth/login?returnUrl=/admin">Login</a>
<br />
{JSON.stringify(data)}
{#if data.sessionValid}
	<ul>
		<li><a href="/admin/setup">setup survey</a></li>
		<li><a href="/admin/review">review survey </a></li>
		<li><a href="/admin/game/setup">setup game</a></li>
		<li><a href="/admin/game/play">run game</a></li>
	</ul>
{/if}

<script lang="ts">
	const { data } = $props();
</script>

<h1>Admin</h1>
<a href="/auth/login?returnUrl=/admin">Login</a>
<br />
{JSON.stringify(data)}

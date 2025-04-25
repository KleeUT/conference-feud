<script lang="ts">
	let { visible, text, number } = $props();
</script>

<div>
	{#if visible}
		<p>{text}</p>
	{:else}
		<p>{number}</p>
	{/if}
</div>

<style>
	div {
		background: hsla(245, 98%, 50%, 1);

		background: linear-gradient(0deg, hsla(245, 98%, 50%, 1) 0%, hsla(254, 100%, 75%, 1) 100%);

		background: -moz-linear-gradient(0deg, hsla(245, 98%, 50%, 1) 0%, hsla(254, 100%, 75%, 1) 100%);

		background: -webkit-linear-gradient(90deg, hsla(245, 98%, 50%, 1) 50%, lightblue 100%);

		filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#1A05FC", endColorstr="#9D7FFF", GradientType=1 );
		border: 2px solid red;
		padding: 1rem;
		border: 0.2rem solid yellow;
		border-radius: 1rem;
		/* border-bottom: 10px solid darkblue;
		border-right: 10px solid darkblue;
		border-top: 10px solid lightblue;
		border-left: 10px solid lightblue; */
	}
	p {
		text-align: center;
		font-size: 1.5rem;
	}
</style>

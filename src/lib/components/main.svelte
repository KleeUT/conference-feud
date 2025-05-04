<script lang="ts">
	interface Props {
		children: () => any;
		align?: 'left' | 'center' | 'right';
	}
	const { children, align }: Props = $props();
</script>

<main class={align}>
	{@render children?.()}
</main>

<style>
	main {
		/* background-color: darkblue; */
		width: 90%;
		padding: 1rem;
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	main.left {
		align-items: flex-start;
	}
	main.center {
		align-items: center;
	}
	main.right {
		align-items: flex-end;
	}
</style>

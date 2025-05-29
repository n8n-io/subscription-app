<template>
	<component
		:is="tag"
		:class="[$style.title, $style[`title--${props.color}`], props.class]"
	>
		<slot />
	</component>
</template>

<script setup lang="ts">
interface HeadingProps {
	tag?: string;
	color?: 'gradient-silver-purple';
	class?: string;
}

const props = withDefaults(defineProps<HeadingProps>(), {
	tag: 'h2',
	color: 'gradient-silver-purple',
});
</script>

<style module lang="scss">
.title {
	width: fit-content;

	&--gradient-silver-purple {
		background-image: var(--gradient-silver-purple);
		background-clip: text;
		letter-spacing: -0.02em;
		-webkit-text-fill-color: transparent;
	}
}
</style>

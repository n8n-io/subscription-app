<template>
	<label
		class="toggle-label"
		@change="$emit('update:modelValue', !modelValue)"
	>
		<slot name="label-left"></slot>
		<input class="toggle-input" type="checkbox" :checked="modelValue" />
		<div class="toggle-switch"></div>
		<slot name="label-right"></slot>
	</label>
</template>

<script setup lang="ts">
defineProps({
	modelValue: Boolean,
});
defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
.toggle-label {
	display: inline-flex;
	cursor: pointer;
	align-items: center;
	gap: 0.5rem;
}

.toggle-input {
	visibility: hidden;
	position: absolute;
}

.toggle-switch {
	position: relative;
	display: inline-block;
	height: 30px;
	width: 52px;
	border-radius: 52px;
	vertical-align: middle;
	transition: all 0.25s;
	border: 1.5px solid #fff3;

	&:before {
		content: '';
		position: absolute;
		left: 3px;
		top: 3px;
		display: block;
		height: 21px;
		width: 21px;
		border-radius: 50%;
		background-color: white;
		transition: left 0.25s;
	}

	input:checked + & {
		will-change: background;
		background: #677fff;

		&:before {
			left: 25px;
		}
	}
}
</style>

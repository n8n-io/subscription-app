<script lang="ts" setup>
export interface Props {
	theme: 'success' | 'danger';
}

withDefaults(defineProps<Props>(), {
	theme: 'success',
});
</script>
<template>
	<div :class="[$style.banner, $style[theme]]">
		<i v-if="theme === 'success'" class="fas fa-check-circle"></i>
		<i v-else class="fas fa-times-circle"></i>

		<slot></slot>
	</div>
</template>

<style lang="scss" module>
.banner {
	color: var(--color-text-xlight);
	padding: 17px 19px;
	border-radius: 4px;
	font-weight: 400;
	font-size: 18px;
	display: flex;
	justify-content: center;

	svg {
		margin-top: 5px;
		margin-right: 17px;
	}

	a {
		color: var(--color-text-xlight);
	}
}

.success {
	background-color: var(--color-success-light);
}

.danger {
	background-color: var(--color-danger);
}
</style>

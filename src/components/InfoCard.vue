<script lang="ts" setup>
export interface Props {
	loading?: boolean;
}

defineProps<Props>();
</script>
<template>
	<div :class="$style.card" v-loading="loading">
		<slot></slot>
	</div>
</template>

<style lang="scss" module>
.card {
	width: 100%;
	padding: 27px 30px;
	background-color: var(--color-background-xlight);
	border-radius: 8px;
	border: 1px solid var(--color-foreground-base);

	label {
		font-weight: 600;
	}

	:global(.el-loading-mask) {
		border-radius: 8px;
	}
}
</style>

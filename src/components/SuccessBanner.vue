<script lang="ts" setup></script>
<template>
	<div :class="$style.banner">
		<i class="fas fa-check-circle"></i>

		<slot></slot>
	</div>
</template>

<style lang="scss" module>
.banner {
	background-color: var(--color-success-light);
	color: var(--color-text-xlight);
	padding: 17px 19px;
	border-radius: 4px;
	font-weight: 400;
	font-size: 18px;

	svg {
		margin-right: 17px;
	}

	a {
		color: var(--color-text-xlight);
	}
}
</style>

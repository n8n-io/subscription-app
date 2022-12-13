<script lang="ts" setup></script>
<template>
	<div :class="$style.banner">
		<i class="fa-sharp fa-solid fa-circle-check"></i>

		<slot></slot>
	</div>
</template>

<style lang="scss" module>
.banner {
	background-color: var(--color-success-light);
	color: var(--color-text-xlight);
	padding: 17px 15px;
	border-radius: 4px;
	font-weight: 400;
	font-size: 18px;

	a {
		color: var(--color-text-xlight);
	}
}
</style>

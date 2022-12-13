<script setup lang="ts">
export interface Props {
	title: string;
}

defineProps<Props>();

</script>

<template>
	<header>
		<div :class="$style.background"></div>
		<img alt="n8n logo" class="logo" src="@/assets/logo.png" height="25" />
	</header>

	<main>
		<h1 :class="$style.title">{{ title }}</h1>
		<slot></slot>
	</main>
</template>

<style module>
.background {
	background-color: var(--color-background-dark);
	min-height: 489px;
	position: absolute;
	min-width: 100vw;
}

header img {
	margin-left: 108px;
	margin-top: 26px;
}

main {
	margin: 100px var(--spacing-2xl);
	padding-bottom: 100px;
	min-width: 900px;
}

.title {
	color: var(--color-text-xlight);
	margin-bottom: 80px;
	text-align: center;
}
</style>

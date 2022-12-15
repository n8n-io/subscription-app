<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
	title: string;
	backgroundHeight?: number;
}

const params = new URLSearchParams(window.location.search);
const callbackParam = params.get('callback');
const callbackUrl = callbackParam ? decodeURIComponent(callbackParam) : '';

const props = defineProps<Props>();

const backgroundStyle = computed(() => ({
	minHeight: props.backgroundHeight ? `${props.backgroundHeight}px` : '489px',
}));
</script>

<template>
	<header>
		<div :class="$style.background" :style="backgroundStyle"></div>
		<a href="https://n8n.io">
			<img
				alt="n8n logo"
				:class="$style.logo"
				src="@/assets/logo.png"
				height="25"
			/>
		</a>
		<div v-if="callbackUrl" :class="$style.backButton">
			<a :href="callbackUrl">
				{{ $t('backToN8n') }}
			</a>
		</div>
	</header>

	<main>
		<h1 :class="$style.title">{{ title }}</h1>
		<slot></slot>
	</main>
</template>

<style module lang="scss">
.background {
	background-color: var(--color-background-dark);
	position: absolute;
	min-width: 100vw;
}

header {
	position: relative;
	min-height: 100px;
}

.logo {
	position: absolute;
	left: 108px;
	top: 26px;
}

main {
	margin: 0 var(--spacing-2xl);
	padding-bottom: 100px;
	min-width: 900px;
}

.title {
	color: var(--color-text-xlight);
	margin-bottom: 80px;
	text-align: center;
}

.backButton {
	position: absolute;
	top: 26px;
	right: 113px;

	a {
		color: var(--color-text-xlight);
		text-decoration: none;
		font-weight: 700;
	}
}
</style>

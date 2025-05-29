<script setup lang="ts">
import ContentHeading from '@/components/ContentHeading.vue';

export interface Props {
	title: string;
}

defineProps<Props>();
</script>

<template>
	<header :class="[$style.container, $style.header]">
		<a href="https://n8n.io" :class="[$style.logo]">
			<img alt="n8n logo" src="@/assets/logo.png" height="25" />
		</a>
	</header>

	<main :class="[$style.main]">
		<div :class="[$style.container]">
			<ContentHeading tag="h1" :class="$style.title">
				{{ title }}
			</ContentHeading>
			<slot></slot>
		</div>
		<slot name="faq"></slot>
	</main>
</template>

<style module lang="scss">
.wrapper {
	background: linear-gradient(180deg, #000 0%, #0e0918 100%);
}

.container {
	display: flex;
	flex-direction: column;
	max-width: 1440px;
	margin: 0 auto;
	flex: 1;
}

.main {
	overflow-x: hidden;
	display: flex;
	flex: 1;
	flex-direction: column;
	height: 100%;
}

header {
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 48px 160px;

	@media (max-width: 992px) {
		padding: 32px 16px;
	}
}

.logo {
	display: flex;

	@media (max-width: 992px) {
		justify-content: center;
	}
}

.title {
	padding-top: var(--spacing-5xl);
	padding-bottom: var(--spacing-5xl);
	text-align: center;
	margin: 0 auto;

	@media (max-width: 992px) {
		padding: 0 16px;
		font-size: 38px;
		line-height: 110%;
	}
}

.backButton {
	a {
		text-decoration: none;
	}
}
</style>

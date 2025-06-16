<template>
	<div :class="$style.container">
		<div :class="$style.baseSection">
			<div :class="$style.sectionGrid">
				<div :class="$style.titleWrapper">
					<h2 :class="$style.title">
						{{ title }}
					</h2>
				</div>
				<div v-for="card in cards" :key="card.id" :class="$style.card">
					<div :class="$style.cardContent">
						<p :class="$style.cardTitle">
							{{ card.title }}
						</p>
						<p :class="$style.cardDescription">
							{{ card.description }}
						</p>
					</div>
					<a
						:href="card.button.url"
						target="_blank"
						:class="$style.cardButton"
					>
						<VButton variant="secondary" :class="$style.cardButton">
							{{ card.button.text }}
						</VButton>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import VButton from './VButton.vue';
import { computed } from 'vue';

interface InfoCardButton {
	text: string;
	url: string;
}

interface InfoCard {
	id: string | number;
	title: string;
	description: string;
	button?: InfoCardButton;
}

interface InfoCardSectionComponent {
	title: string;
	cards?: InfoCard[];
}

const props = defineProps<InfoCardSectionComponent>();

const cards = computed(() => props.cards || []);
</script>

<style lang="scss" module>
.container {
	background-color: transparent;
	padding-top: var(--spacing-2xl);
}

.baseSection {
	margin: 0 auto;
}

.sectionGrid {
	position: relative;
	display: grid;
	gap: var(--spacing-s);

	@media (min-width: 640px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (min-width: 1024px) {
		grid-template-columns: repeat(4, 1fr);
	}
}

.titleWrapper {
	width: 100%;
	flex: none;
}

.title {
	font-size: 2rem; // 32px
	line-height: 1.2; // 120%
	letter-spacing: -0.03em;
	color: var(--color-white);
	margin: 0;
	font-weight: 400;

	@media (min-width: 640px) {
		grid-column: span 2;
	}

	@media (min-width: 1024px) {
		grid-column: span 1;
	}
}

.card {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: var(--spacing-s);
	border-radius: var(--border-radius-lg);
	background-color: rgba(255, 255, 255, 0.1);
	padding: var(--spacing-l);
	box-shadow: 0 4px 8px rgba(13, 13, 18, 0.02),
		0 5px 10px rgba(13, 13, 18, 0.04);
	backdrop-filter: blur(2px);
	-webkit-backdrop-filter: blur(2px);
}

.cardButton {
	text-decoration: none;
}

.cardContent {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-3xs);
}

.cardTitle {
	font-size: 1rem;
	color: var(--color-white);
	margin: 0;
	font-weight: 400;
}

.cardDescription {
	font-size: 1rem;
	color: var(--color-paragraphs);
	margin: 0;
	line-height: 1.5;
}

.cardButton {
	margin-top: auto;
}
</style>

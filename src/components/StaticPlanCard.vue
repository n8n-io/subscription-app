<template>
	<div
		:class="[
			$style.container,
			recommended ? $style.halfbordered : $style.fullbordered,
			theme === 'dark' ? $style.darkTheme : $style.lightTheme,
		]"
	>
		<div :class="$style.section">
			<div :class="$style.badge">
				<BadgePill :variant="badgeVariant">
					<template #icon><IconThunder /></template>
					{{ plan.name }}
				</BadgePill>
			</div>
			<div :class="$style.description">
				{{ plan.description }}
				<span
					v-if="plan.id === 'startup'"
					:class="$style.tooltipContainer"
				>
					<IconInfo :class="$style.tooltipIcon" />
					<span :class="$style.tooltip">
						You can keep the startup offer for one year, or longer,
						as long as you continue to meet the eligibility
						criteria.
					</span>
				</span>
			</div>
		</div>

		<div :class="[$style.section, $style.pricingSection]">
			<div :class="$style.pricing">
				<span
					:class="$style.quote"
					v-if="
						plan.price === 'contact' ||
						((plan.id === 'business' || plan.id === 'startup') &&
							selectedTier === null &&
							!showCustomProduct) ||
						((plan.id === 'business' || plan.id === 'startup') &&
							showCustomProduct)
					"
				>
					{{ showCustomProduct ? 'Custom' : 'Contact sales' }}
				</span>
				<span v-else :class="$style.priceContainer">
					<span
						v-if="isAnnual && monthlyPriceFromAnnual > 0"
						:class="$style.crossedOutPrice"
					>
						{{ formatPrice(monthlyPrice) }}
					</span>
					<span :class="$style.price">
						{{
							formatPrice(
								isAnnual ? monthlyPriceFromAnnual : displayPrice
							)
						}}
					</span>
					<span :class="[$style.recurring]">
						{{
							isAnnual
								? ' / per month, billed annually'
								: ' / month'
						}}
					</span>
				</span>
			</div>

			<!-- Business plan tier selector -->
			<div
				v-if="plan.id === 'business' || plan.id === 'startup'"
				:class="$style.dropdown"
			>
				<div
					ref="dropdownElement"
					:class="$style.dropdown__selected"
					@click="
						plan.pricingTiers && plan.pricingTiers.length > 1
							? toggleDropdown()
							: null
					"
				>
					<span
						v-if="showCustomProduct"
						:class="$style.dropdown__workflows"
					>
						<IconSettings />
					</span>
					<span v-else :class="$style.dropdown__workflows">{{
						selectedTier
							? formatExecutions(currentExecutions)
							: 'Select tier'
					}}</span>
					<div>
						<span :class="$style.dropdown__active">
							{{
								showCustomProduct
									? 'Custom executions'
									: `Production executions / ${
											props.isAnnual ? 'year' : 'month'
									  }`
							}}
						</span>
						<span :class="$style.dropdown__test">
							{{
								showCustomProduct
									? 'custom active workflows'
									: 'with unlimited workflows, steps and users'
							}}
						</span>
					</div>
					<span
						v-if="plan.pricingTiers && plan.pricingTiers.length > 1"
						:class="[
							$style.dropdown__arrow,
							showDropdown ? $style.dropdown__arrow_up : '',
						]"
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M5 7.5L10 12.5L15 7.5"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</span>
				</div>
				<div
					v-if="
						showDropdown &&
						plan.pricingTiers &&
						plan.pricingTiers.length > 1
					"
					:class="$style.dropdown__menu"
				>
					<svg
						viewBox="0 0 330 16"
						xmlns="http://www.w3.org/2000/svg"
						:class="$style.dropdown__svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M330 16V0C330 8.83656 322.837 16 314 16H330ZM16 16C7.16345 16 0 8.83656 0 0V16H16Z"
							fill="black"
							fill-opacity="0.45"
						/>
					</svg>
					<div :class="$style.dropdown__content">
						<div
							v-for="tier in plan.pricingTiers"
							:key="tier.executionsAnnual"
							:class="[
								$style.dropdown__option,
								selectedTier?.executionsAnnual ===
								tier.executionsAnnual
									? $style.dropdown__option_selected
									: '',
							]"
							@click="selectTier(tier)"
						>
							<div :class="$style.option__price">
								{{
									formatPrice(
										isAnnual
											? tier.priceAnnual
											: tier.priceMonthly
									)
								}}/{{ isAnnual ? 'year' : 'month' }}
							</div>
							<div :class="$style.option__description">
								{{
									formatExecutions(
										props.isAnnual
											? tier.executionsAnnual
											: tier.executionsMonthly
									)
								}}
								Production executions /
								{{ props.isAnnual ? 'year' : 'month' }}
							</div>
						</div>
						<div
							:class="[
								$style.dropdown__option,
								showCustomProduct
									? $style.dropdown__option_selected
									: '',
							]"
							@click="selectCustomTier"
						>
							<div :class="$style.option__price">Custom plan</div>
							<div :class="$style.option__description">
								Custom executions
							</div>
						</div>
					</div>
				</div>
				<div
					v-if="plan.id === 'business' || plan.id === 'startup'"
					:class="$style.singleTier"
				>
					<small>{{ getStartsAtMessage() }}</small>
				</div>
			</div>

			<!-- Community/Enterprise unlimited display -->
			<div
				v-else-if="plan.executions === 'unlimited'"
				:class="$style.unlimited"
			>
				<span :class="$style.unlimited__icon"><IconInfinity /></span>
				<div :class="$style.unlimited__info">
					<span :class="$style.unlimited__text">
						Unlimited
						{{ plan.id === 'community' ? 'executions' : 'users' }}
					</span>
					<span :class="$style.unlimited__description">
						and unlimited workflows
					</span>
				</div>
			</div>
			<div
				v-else-if="plan.executions === 'custom'"
				:class="$style.unlimited"
			>
				<span
					:class="[
						$style.unlimited__icon,
						$style.unlimited__iconWhite,
					]"
				>
					<IconSettings />
				</span>
				<div :class="$style.unlimited__info">
					<span :class="$style.unlimited__text">
						Custom number of workflow executions
					</span>
					<span :class="$style.unlimited__description">
						with unlimited steps
					</span>
				</div>
			</div>
			<div v-if="plan.id === 'enterprise'" :class="$style.singleTier">
				<small>{{ getStartsAtMessage() }}</small>
			</div>
		</div>

		<div :class="$style.plan_includes">
			{{
				plan.id === 'community'
					? 'This plan includes:'
					: `Everything in ${getPreviousPlan(plan.id)}, plus:`
			}}
		</div>

		<div :class="$style.features__list">
			<div v-if="plan.features" :class="$style.features">
				<div
					v-for="feature in plan.features"
					:key="feature"
					:class="$style.features__details"
				>
					<span :class="$style.features__icon"><IconTick /></span>
					<span :class="$style.features__info">{{ feature }}</span>
				</div>
			</div>

			<div :class="$style.cta">
				<div
					v-if="
						plan.primaryCTA &&
						!(
							(plan.id === 'business' || plan.id === 'startup') &&
							showCustomProduct
						)
					"
					:class="$style.primaryCTA"
				>
					<VButton
						v-if="plan.primaryCTA === 'contact-us'"
						variant="primary"
						@click="openContactForm"
					>
						Contact sales
					</VButton>
					<VButton
						v-else-if="plan.primaryCTA === 'start-trial'"
						variant="primary"
						@click="onStartTrial"
					>
						Start 14 day trial
					</VButton>
					<VButton
						v-else-if="plan.primaryCTA === 'subscribe'"
						variant="primary"
						@click="onStartTrial"
						:style="
							(plan.id === 'business' || plan.id === 'startup') &&
							showCustomProduct
								? 'display: none'
								: ''
						"
					>
						Subscribe
					</VButton>
					<VButton
						v-else-if="plan.primaryCTA === 'get-started'"
						variant="primary"
						@click="$emit('getStarted')"
					>
						Get started
					</VButton>
				</div>

				<!-- Business plan specific CTA buttons -->
				<template v-if="plan.id === 'business'">
					<span
						v-if="!showCustomProduct"
						:class="$style.cta__seperator"
						>or</span
					>
					<div :class="$style.secondaryCTA">
						<VButton variant="secondary" @click="openMainSupport">
							Contact sales
						</VButton>
					</div>
				</template>
			</div>
		</div>

		<!-- Business plan terms and conditions -->
		<div
			v-if="plan.id === 'business' || plan.id === 'startup'"
			:class="$style.termsNotice"
		>
			<small>
				By continuing, you agree to our
				<a
					href="https://n8n.io/legal/?_gl=1*1wtpiaz*_gcl_au*NzIyMjU0Mzk0LjE3NDcyMjkzMTc.*_ga*MTE0NDc5MTE3NS4xNzQ3ODMzMzI5*_ga_0SC4FF2FH9*czE3NTAyNDM5NTgkbzQ4JGcxJHQxNzUwMjQ0NDY1JGo2MCRsMCRoMA..#terms"
					target="_blank"
					>terms and conditions</a
				>.
				<a
					href="https://n8n.io/legal/?_gl=1*x5q6sk*_gcl_au*NzIyMjU0Mzk0LjE3NDcyMjkzMTc.*_ga*MTE0NDc5MTE3NS4xNzQ3ODMzMzI5*_ga_0SC4FF2FH9*czE3NTAyNDM5NTgkbzQ4JGcxJHQxNzUwMjQ0NDY1JGo2MCRsMCRoMA..#privacy"
					target="_blank"
					>Privacy policy</a
				>.
			</small>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import type { PricingTier } from '@/constants';

import BadgePill from './BadgePill.vue';
import IconTick from './icons/IconTick.vue';
import IconThunder from './icons/IconThunder.vue';
import IconInfinity from './icons/IconInfinity.vue';
import VButton from './VButton.vue';
import IconSettings from './icons/IconSettings.vue';
import IconInfo from './icons/IconInfo.vue';

type BadgeVariant = 'dark' | 'orange' | 'black' | 'pink' | 'green';
type Theme = 'light' | 'dark';

interface StaticPlan {
	id: string;
	name: string;
	description: string;
	price: number | string;
	features: string[];
	executions?: string | number;
	workflows?: string;
	users?: string;
	primaryCTA?: string;
	secondaryCTA?: string;
	pricingTiers?: PricingTier[];
}

interface Props {
	plan: StaticPlan;
	recommended?: boolean;
	badgeVariant?: BadgeVariant;
	theme?: Theme;
	isAnnual?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	theme: 'light',
	isAnnual: false,
});

const selectedTier = ref<PricingTier | null>(null);
const showDropdown = ref(false);
const dropdownElement = ref<HTMLElement | null>(null);
const showCustomProduct = ref(false);
const locale = navigator.language;
const currency = locale === 'en-US' ? '$' : '€';

const emit = defineEmits<{
	(
		event: 'startTrial',
		priceId: string,
		executions: number,
		billingPeriod: 'monthly' | 'annual'
	): void;
	(event: 'contactUs'): void;
	(event: 'getStarted'): void;
}>();

// Set default tier for business plan
onMounted(() => {
	if (
		(props.plan.id === 'business' || props.plan.id === 'startup') &&
		props.plan.pricingTiers?.length
	) {
		selectedTier.value = props.plan.pricingTiers[0];
	}
	document.addEventListener('click', closeDropdown);
});

onBeforeUnmount(() => {
	document.removeEventListener('click', closeDropdown);
});

const displayPrice = computed(() => {
	if (props.plan.id === 'community') return 0;
	if (
		(props.plan.id === 'business' || props.plan.id === 'startup') &&
		selectedTier.value
	) {
		return props.isAnnual
			? selectedTier.value.priceAnnual
			: selectedTier.value.priceMonthly;
	}
	return typeof props.plan.price === 'number' ? props.plan.price : 0;
});

const monthlyPrice = computed(() => {
	if (props.plan.id === 'community') return 0;
	if (
		(props.plan.id === 'business' || props.plan.id === 'startup') &&
		selectedTier.value
	) {
		return selectedTier.value.priceMonthly;
	}
	return typeof props.plan.price === 'number' ? props.plan.price : 0;
});

const monthlyPriceFromAnnual = computed(() => {
	if (props.plan.id === 'community') return 0;
	if (
		(props.plan.id === 'business' || props.plan.id === 'startup') &&
		selectedTier.value
	) {
		return Math.ceil(selectedTier.value.priceAnnual / 12);
	}
	return 0;
});

const currentExecutions = computed(() => {
	if (
		(props.plan.id === 'business' || props.plan.id === 'startup') &&
		selectedTier.value
	) {
		return props.isAnnual
			? selectedTier.value.executionsAnnual
			: selectedTier.value.executionsMonthly;
	}
	return 0;
});

function formatExecutions(count: number): string {
	if (count >= 1000000) {
		return `${(count / 1000000).toFixed(1)}M`;
	}
	if (count >= 1000) {
		return `${(count / 1000).toFixed(0)}K`;
	}
	return count.toString();
}

function formatPrice(price: number): string {
	return currency + price.toLocaleString('de-DE');
}

function getPreviousPlan(planId: string): string {
	switch (planId) {
		case 'business':
			return 'Community';
		case 'enterprise':
			return 'Business';
		default:
			return 'Community';
	}
}

function toggleDropdown() {
	showDropdown.value = !showDropdown.value;
}

function selectTier(tier: PricingTier) {
	selectedTier.value = tier;
	showCustomProduct.value = false;
	showDropdown.value = false;
}

function selectCustomTier() {
	showCustomProduct.value = true;
	selectedTier.value = null;
	showDropdown.value = false;
}

function closeDropdown(e: MouseEvent) {
	if (
		dropdownElement.value &&
		!dropdownElement.value.contains(e.target as Node)
	) {
		showDropdown.value = false;
	}
}

function onStartTrial() {
	if (!selectedTier.value) return;

	const billingPeriod = props.isAnnual ? 'annual' : 'monthly';
	const priceId = selectedTier.value.priceIds[billingPeriod];

	emit('startTrial', priceId, currentExecutions.value, billingPeriod);
}

function trackContactUs() {
	emit('contactUs');
}

function openMainSupport() {
	trackContactUs();
}

function openContactForm() {
	trackContactUs();
}

function getStartsAtMessage(): string {
	if (
		(props.plan.id === 'business' || props.plan.id === 'startup') &&
		selectedTier.value
	) {
		return 'Starts at 480k production executions / year with unlimited steps';
	}
	if (props.plan.id === 'enterprise') {
		return 'Starts at 600k production executions / year with unlimited steps';
	}
	return '';
}
</script>

<style lang="scss" module>
.container {
	border-radius: var(--border-radius-base);
	border: 1px solid rgba(255, 255, 255, 0.15);
	background: rgba(255, 255, 255, 0.1);
	padding: var(--spacing-s);
	padding-bottom: calc(var(--spacing-s) + 60px);
	flex: 1;
	display: flex;
	flex-direction: column;
	position: relative;
}

.lightTheme {
	background: rgba(255, 255, 255, 0.1);
}

.darkTheme {
	background: rgba(0, 0, 0, 0.1);
}

.pricingSection {
	margin-bottom: var(--spacing-s);
}

.badge {
	margin-bottom: var(--spacing-s);
}

.description {
	text-align: left;
	font-size: var(--font-size-md);
	color: var(--color-paragraphs);
	line-height: 150%;
	max-width: 462px;
}

.plan_includes {
	font-size: var(--font-size-base);
	color: var(--color-white);
	line-height: 150%;
	margin-bottom: var(--spacing-s);
}

.pricing {
	height: 60px;
	display: flex;
	justify-content: left;
	align-items: center;
	color: var(--color-white);
	margin: var(--spacing-l) 0;

	.quote {
		font-size: var(--font-size-xxl);
		font-weight: 400;
		letter-spacing: -2.16px;
	}

	.currency {
		font-size: var(--font-size-3xl);
		font-weight: 400;
	}

	.priceContainer {
		display: flex;
		align-items: baseline;
		gap: 8px;
	}

	.price {
		font-size: var(--font-size-xxl);
		font-weight: 400;
		letter-spacing: -2.16px;
	}

	.crossedOutPrice {
		color: rgba(255, 255, 255, 0.7);
		text-decoration: line-through;
		font-size: var(--font-size-xxl);
		font-weight: 400;
		letter-spacing: -2.16px;
	}

	.recurring {
		margin-left: var(--spacing-2xs);
		color: rgba(255, 255, 255, 0.8);
	}
}

.dropdown {
	position: relative;
	width: 100%;

	&__selected {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		border-radius: var(--border-radius-base);
		border: 1px solid rgba(255, 255, 255, 0.15);
		background: rgba(255, 255, 255, 0.1);
		padding: var(--spacing-s);
		cursor: pointer;
		color: var(--color-text-dark);
		font-size: var(--font-size-sm);
		gap: var(--spacing-l);
		height: 82px;
		position: relative;
		z-index: 20;
		isolation: isolate;
	}

	&__workflows {
		font-size: 38px;
		font-weight: 400;
		line-height: 90%;
		letter-spacing: -0.03em;
		color: var(--color-white);
	}

	&__active {
		font-family: var(--font-family-geomanist);
		font-size: var(--font-size-sm);
		color: var(--color-white);
		font-weight: 400;
		letter-spacing: 0.025em;
		display: flex;
	}

	&__test {
		font-size: var(--font-size-sm);
		color: var(--color-paragraphs);
		font-weight: 300;
		letter-spacing: 0.025em;
	}

	&__arrow {
		position: absolute;
		display: flex;
		flex: 1;
		justify-content: end;
		align-items: center;
		transition: transform 0.3s ease;
		color: var(--color-white);
		right: var(--spacing-s);

		&_up {
			transform: rotate(180deg);
		}
	}

	&__menu {
		position: absolute;
		z-index: 10;
		margin-top: -17px;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	&__svg {
		width: 100%;
		height: auto;
	}

	&__content {
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(25px);
		border: 1px solid rgba(14, 9, 24, 0.15);
		border-top: 0;
		border-radius: 0 0 var(--border-radius-base) var(--border-radius-base);
		padding: 0 var(--spacing-2xs) var(--spacing-2xs);
		box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.15);
	}

	&__option {
		position: relative;
		cursor: pointer;
		padding: var(--spacing-xs) var(--spacing-l);
		color: #d5cbe5;
		transition: color 0.3s ease;

		&:hover {
			color: var(--color-white);
		}

		&_selected {
			color: var(--color-white);
		}

		&:not(:last-child) {
			&::before,
			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 0;
				height: 1px;
				width: 100%;
				background: rgba(155, 158, 184, 0.22);
				transition: width 0.3s ease-in-out;
			}

			&::after {
				width: 0;
				background: #5b3acc;
			}

			&:hover::after {
				width: 100%;
			}
		}
	}
}

.option {
	&__price {
		font-size: var(--font-size-base);
		font-weight: 500;
		line-height: 170%;
		color: var(--color-white);
	}

	&__description {
		line-height: 170%;
	}
}

.unlimited {
	border-radius: var(--border-radius-base);
	border: 1px solid rgba(255, 255, 255, 0.15);
	background: rgba(255, 255, 255, 0.1);
	padding: var(--spacing-s);
	display: flex;
	align-items: center;
	gap: var(--spacing-l);
	min-height: 82px;

	&__icon {
		display: flex;
	}

	&__iconWhite {
		color: var(--color-white);
	}

	&__info {
		display: flex;
		flex-direction: column;
	}

	&__text {
		font-size: var(--font-size-sm);
		color: var(--color-white);
		font-weight: 400;
	}

	&__description {
		font-size: var(--font-size-sm);
		color: var(--color-paragraphs);
		font-weight: 300;
	}
}

.features {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-xs);
	justify-content: center;
	margin-bottom: var(--spacing-9xl);

	&__list {
		display: flex;
		flex: 1;
		flex-direction: column;
		height: 100%;
		justify-content: space-between;
	}

	&__details {
		display: flex;
		align-items: center;
		gap: var(--spacing-2xs);
	}

	&__icon {
		border-radius: var(--border-radius-sm);
		background: rgba(101, 101, 101, 0.3);
		backdrop-filter: blur(21.818180084228516px);
		width: 16px;
		height: 16px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	&__info {
		font-size: var(--font-size-base);
		font-weight: 400;
		color: var(--color-paragraphs);
	}
}

.cta {
	display: flex;
	width: 100%;
	align-items: center;

	&__seperator {
		margin: 0 var(--spacing-2xs);
		font-size: var(--font-size-xs);
		color: var(--color-paragraphs);
		font-weight: 400;
	}
}

.primaryCTA {
	display: flex;
	width: 100%;
}

.secondaryCTA {
	display: flex;
	width: 100%;
	align-items: center;
}

.singleTier {
	margin-top: var(--spacing-xs);
	text-align: center;

	small {
		color: var(--color-paragraphs);
		font-size: var(--font-size-xs);
		font-style: italic;
	}
}

.termsNotice {
	position: absolute;
	bottom: var(--spacing-s);
	left: var(--spacing-s);
	right: var(--spacing-s);
	text-align: center;

	small {
		color: var(--color-paragraphs);
		font-size: var(--font-size-xs);
		font-style: italic;

		a {
			color: var(--color-paragraphs);
			text-decoration: underline;

			&:hover {
				color: var(--color-white);
			}
		}
	}
}

.tooltipContainer {
	position: relative;
	display: inline-block;
	vertical-align: middle;
}

.tooltipIcon {
	cursor: pointer;
	opacity: 0.7;
	transition: opacity 0.2s ease;

	&:hover {
		opacity: 1;
	}
}

.tooltip {
	position: absolute;
	bottom: 100%;
	left: 50%;
	transform: translateX(-50%);
	background: rgba(0, 0, 0, 0.9);
	color: var(--color-white);
	padding: var(--spacing-xs);
	border-radius: var(--border-radius-sm);
	font-size: var(--font-size-sm);
	z-index: 1000;
	opacity: 0;
	pointer-events: none;
	transition: opacity 0.2s ease;
	margin-bottom: var(--spacing-2xs);
	width: 350px;
	white-space: normal;
	line-height: 1.4;

	&::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		border: 5px solid transparent;
		border-top-color: rgba(0, 0, 0, 0.9);
	}

	@media (max-width: 768px) {
		left: 50%;
		right: auto;
		transform: translateX(-50%);
		width: 280px;

		&::after {
			left: 50%;
			right: auto;
			transform: translateX(-50%);
		}
	}
}

.tooltipContainer:hover .tooltip {
	opacity: 1;
	pointer-events: auto;
}
</style>

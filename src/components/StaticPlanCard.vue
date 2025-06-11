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
			</div>
		</div>

		<div :class="[$style.section, $style.pricingSection]">
			<div :class="$style.pricing">
				<span
					:class="$style.quote"
					v-if="
						plan.price === 'contact' ||
						(plan.id === 'business' && selectedTier === null)
					"
				>
					Contact us
				</span>
				<span v-else>
					<span :class="$style.currency">€</span>
					<span :class="$style.price">
						{{ displayPrice }}
					</span>
					<span :class="[$style.recurring]">
						{{ isAnnual ? ' / year' : ' / month' }}
					</span>
				</span>
			</div>

			<!-- Business plan tier selector -->
			<div v-if="plan.id === 'business'" :class="$style.dropdown">
				<div
					ref="dropdownElement"
					:class="$style.dropdown__selected"
					@click="
						plan.pricingTiers && plan.pricingTiers.length > 1
							? toggleDropdown()
							: null
					"
				>
					<span :class="$style.dropdown__workflows">{{
						selectedTier
							? formatExecutions(currentExecutions)
							: 'Select tier'
					}}</span>
					<div>
						<span :class="$style.dropdown__active">
							Production executions /
							{{ props.isAnnual ? 'year' : 'month' }}
						</span>
						<span :class="$style.dropdown__test">
							with unlimited steps
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
							fill="none"
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
						fill="none"
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
								€{{
									isAnnual
										? tier.priceAnnual
										: tier.priceMonthly
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
					</div>
				</div>
				<div v-if="plan.id === 'business'" :class="$style.singleTier">
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
				<div v-if="plan.primaryCTA" :class="$style.primaryCTA">
					<VButton
						v-if="plan.primaryCTA === 'contact-us'"
						variant="primary"
						@click="openContactForm"
					>
						Contact us
					</VButton>
					<VButton
						v-else-if="plan.primaryCTA === 'start-trial'"
						variant="primary"
						@click="onStartTrial"
					>
						Start free trial
					</VButton>
					<VButton
						v-else-if="plan.primaryCTA === 'subscribe'"
						variant="primary"
						@click="onStartTrial"
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
					<span :class="$style.cta__seperator">or</span>
					<div :class="$style.secondaryCTA">
						<VButton variant="secondary" @click="openMainSupport">
							Contact us
						</VButton>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, type Ref, onMounted, onBeforeUnmount } from 'vue';
import type { PricingTier } from '@/constants';
import {
	BUSINESS_CONTACT_FORM_URL,
	ENTERPRISE_CONTACT_FORM_URL,
} from '@/constants';
import BadgePill from './BadgePill.vue';
import IconTick from './icons/IconTick.vue';
import IconThunder from './icons/IconThunder.vue';
import IconInfinity from './icons/IconInfinity.vue';
import VButton from './VButton.vue';

type BadgeVariant = 'dark' | 'orange' | 'black' | 'pink';
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

const selectedTier: Ref<PricingTier | null> = ref(null);
const showDropdown = ref(false);
const dropdownElement = ref<HTMLElement | null>(null);

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
	if (props.plan.id === 'business' && props.plan.pricingTiers?.length) {
		selectedTier.value = props.plan.pricingTiers[0];
	}
	document.addEventListener('click', closeDropdown);
});

onBeforeUnmount(() => {
	document.removeEventListener('click', closeDropdown);
});

const displayPrice = computed(() => {
	if (props.plan.id === 'community') return 0;
	if (props.plan.id === 'business' && selectedTier.value) {
		return props.isAnnual
			? selectedTier.value.priceAnnual
			: selectedTier.value.priceMonthly;
	}
	return typeof props.plan.price === 'number' ? props.plan.price : 0;
});

const currentExecutions = computed(() => {
	if (props.plan.id === 'business' && selectedTier.value) {
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

function getPreviousPlan(planId: string): string {
	switch (planId) {
		case 'business':
			return 'Community';
		case 'enterprise':
			return 'Business';
		default:
			return '';
	}
}

function toggleDropdown() {
	showDropdown.value = !showDropdown.value;
}

function selectTier(tier: PricingTier) {
	selectedTier.value = tier;
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
	window.location.href = BUSINESS_CONTACT_FORM_URL;
	trackContactUs();
}

function openContactForm() {
	if (props.plan.id === 'enterprise') {
		window.location.href = ENTERPRISE_CONTACT_FORM_URL;
	} else {
		window.location.href = BUSINESS_CONTACT_FORM_URL;
	}
	trackContactUs();
}

function getStartsAtMessage(): string {
	if (props.plan.id === 'business') {
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
	flex: 1;
	display: flex;
	flex-direction: column;
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
		font-size: var(--font-size-3xl);
		font-weight: 400;
		letter-spacing: -2.16px;
	}

	.currency {
		font-size: var(--font-size-3xl);
		font-weight: 400;
	}

	.price {
		font-size: var(--font-size-3xl);
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

	&__icon {
		display: flex;
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
</style>

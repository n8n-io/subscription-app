<script setup lang="ts">
import type { Plan, Product } from '@/Interface';
import { computed, ref, type Ref, onMounted, onBeforeUnmount } from 'vue';
import {
	DEFAULT_ACTIVE_WORKFLOWS_OPTION,
	MORE_THAN_MAX_OPTION,
	ENTERPRISE_CONTACT_FORM_URL,
	CURRENCY_USD,
} from '@/constants';
import BadgePill from './BadgePill.vue';
import IconTick from './icons/IconTick.vue';
import IconThunder from './icons/IconThunder.vue';
import IconInfinity from './icons/IconInfinity.vue';
import VButton from './VButton.vue';

// Define the BadgeVariant type locally
type BadgeVariant = 'dark' | 'orange' | 'black' | 'pink';

export interface Props {
	plan: Plan;
	product?: Product;
	defaultOption?: number;
	recommended?: boolean;
	badgeVariant?: BadgeVariant;
}

const props = withDefaults(defineProps<Props>(), {
	defaultOption: DEFAULT_ACTIVE_WORKFLOWS_OPTION,
});

const selected: Ref<string | number> = ref(props.defaultOption);
const showDropdown = ref(false);
const dropdownElement = ref<HTMLElement | null>(null);

const emit = defineEmits<{
	(event: 'startTrial', productId: string, activeWorkflows: number): void;
	(event: 'contactUs'): void;
	(event: 'getStarted'): void;
}>();

function trackContactUs() {
	emit('contactUs');
}

const openMainSupport = () => {
	window.location.href = ENTERPRISE_CONTACT_FORM_URL;
	trackContactUs();
};

const price = computed(() => {
	const basePrice = props.product?.metadata.terms.price[CURRENCY_USD] ?? 0;
	if (typeof selected.value === 'number') {
		const extras = props.product?.metadata.terms.extras ?? [];
		const activeWorkflow = extras.find(
			(extra) => extra.id === 'activeWorkflows'
		);

		if (activeWorkflow) {
			const monthlyPrice = activeWorkflow.price[CURRENCY_USD];

			return basePrice + monthlyPrice * selected.value;
		}
	}

	return basePrice;
});

function onStartTrial() {
	if (!props.product || typeof selected.value !== 'number') {
		return;
	}

	emit('startTrial', props.product.productId, selected.value);
}

function toggleDropdown() {
	showDropdown.value = !showDropdown.value;
}

function onGetStarted() {
	emit('getStarted');
}

function closeDropdown(e: MouseEvent) {
	if (
		dropdownElement.value &&
		!dropdownElement.value.contains(e.target as Node)
	) {
		showDropdown.value = false;
	}
}

function selectOption(value: string | number) {
	selected.value = value;
	showDropdown.value = false;
}

onMounted(() => {
	document.addEventListener('click', closeDropdown);
});

onBeforeUnmount(() => {
	document.removeEventListener('click', closeDropdown);
});

function calculatePriceForOption(optionValue: string | number): number {
	if (optionValue === MORE_THAN_MAX_OPTION) {
		return 0;
	}

	if (typeof optionValue !== 'number') {
		return 0;
	}

	const basePrice = props.product?.metadata.terms.price[CURRENCY_USD] ?? 0;
	const extras = props.product?.metadata.terms.extras ?? [];
	const activeWorkflow = extras.find(
		(extra) => extra.id === 'activeWorkflows'
	);

	if (activeWorkflow) {
		const monthlyPrice = activeWorkflow.price[CURRENCY_USD];
		return basePrice + monthlyPrice * optionValue;
	}

	return basePrice;
}

const isMoreThanMaxOption = computed(() => {
	return selected.value === MORE_THAN_MAX_OPTION;
});
</script>

<template>
	<div
		:class="[
			$style.container,
			recommended ? $style.halfbordered : $style.fullbordered,
		]"
	>
		<div :class="$style.section">
			<div :class="$style.badge">
				<BadgePill :variant="badgeVariant">
					<template #icon><IconThunder /></template>
					{{ $t(props.plan.nameKey) }}
				</BadgePill>
			</div>
			<div :class="$style.description">
				{{ $t(props.plan.descriptionKey) }}
			</div>
		</div>
		<div :class="[$style.section, $style.pricingSection]">
			<div :class="$style.pricing">
				<span
					:class="$style.quote"
					v-if="props.plan.pricing === 'quote' || isMoreThanMaxOption"
				>
					{{ $t('cta.contactUs') }}
				</span>
				<span v-else>
					<span :class="$style.currency">
						{{ $t('pricing.dollars') }}
					</span>
					<span :class="$style.price">
						{{ plan.pricing === 'free' ? 0 : price }}
					</span>
					<span :class="[$style.recurring]">
						{{ $t('pricing.permonth') }}
					</span>
				</span>
			</div>
			<div>
				<div v-if="props.plan.unlimited" :class="$style.unlimited">
					<span :class="$style.unlimited__icon"
						><IconInfinity
					/></span>
					<div :class="$style.unlimited__info">
						<span :class="$style.unlimited__text">
							{{ $t('features.activeWorkflows.active') }}
						</span>
						<span :class="$style.unlimited__description">
							{{ $t('features.activeWorkflows.testWorkflows') }}
						</span>
					</div>
				</div>
				<div v-else :class="$style.dropdown">
					<div
						ref="dropdownElement"
						:class="$style.dropdown__selected"
						@click="toggleDropdown"
					>
						<span :class="$style.dropdown__workflows">{{
							typeof selected === 'number'
								? selected * props.plan.unitSize
								: selected
						}}</span>
						<div>
							<span :class="$style.dropdown__active">
								{{ $t('features.activeWorkflows.active') }}
							</span>
							<span :class="$style.dropdown__test">
								{{
									$t('features.activeWorkflows.testWorkflows')
								}}
							</span>
						</div>
						<span
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
					<div v-if="showDropdown" :class="$style.dropdown__menu">
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
								v-for="item in props.plan.options"
								:key="item.value"
								:class="[
									$style.dropdown__option,
									selected === item.value
										? $style.dropdown__option_selected
										: '',
								]"
								@click="selectOption(item.value)"
							>
								<div :class="$style.option__price">
									<span
										v-if="
											item.value === MORE_THAN_MAX_OPTION
										"
										>{{ $t('cta.contactUs') }}</span
									>
									<span v-else>
										{{ $t('pricing.dollars')
										}}{{
											calculatePriceForOption(item.value)
										}}/{{ $t('pricing.month') }}
									</span>
								</div>
								<div :class="$style.option__description">
									{{
										item.labelKey
											? $t(item.labelKey)
											: $t(
													'features.activeWorkflows.count',
													{
														count:
															typeof item.value ===
															'number'
																? item.value *
																  props.plan
																		.unitSize
																: item.value,
													}
											  )
									}}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div :class="$style.plan_includes">
			{{ $t(`plan.${plan.id}.includes`) }}
		</div>
		<div :class="$style.features__list">
			<div v-if="plan.features" :class="$style.features">
				<div
					v-for="feature in plan.features"
					:key="feature.labelKey"
					:class="$style.features__details"
				>
					<span :class="$style.features__icon"><IconTick /></span>
					<span :class="$style.features__info">
						{{ $t(feature.labelKey) }}
					</span>
				</div>
			</div>
			<div :class="$style.cta">
				<div v-if="plan.primaryCTA" :class="$style.primaryCTA">
					<VButton
						v-if="
							plan.primaryCTA === 'email' || isMoreThanMaxOption
						"
						variant="primary"
						@click="openMainSupport"
					>
						{{ $t('cta.contactUs') }}
					</VButton>
					<VButton
						v-else-if="plan.primaryCTA === 'start-trial'"
						variant="primary"
						@click="onStartTrial"
					>
						{{ $t('cta.startFreeTrial') }}
					</VButton>
					<VButton
						v-else-if="plan.primaryCTA === 'get-started'"
						variant="primary"
						@click="onGetStarted"
					>
						{{ $t('cta.getStarted') }}
					</VButton>
				</div>
				<span
					:class="$style.cta__seperator"
					v-if="plan.secondaryCTA === 'email' && !isMoreThanMaxOption"
					>or</span
				>
				<div
					:class="$style.secondaryCTA"
					v-if="plan.secondaryCTA === 'email' && !isMoreThanMaxOption"
				>
					<VButton variant="secondary" @click="openMainSupport">
						{{ $t('cta.contactUs') }}
					</VButton>
				</div>
			</div>
		</div>
	</div>
</template>

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

.extrasDescription {
	font-weight: 400;
	font-size: var(--font-size-md);
	text-align: center;
	color: var(--color-text-dark);
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
		font-size: 15px;
		font-weight: 500;
		color: var(--color-white);
		line-height: 140%;
		letter-spacing: 0.025em;
		display: flex;
	}

	&__test {
		font-size: 15px;
		font-weight: 300;
		color: var(--color-paragraphs);
		line-height: 140%;
		letter-spacing: 0.025em;
	}

	&__value {
		flex: 1;
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

.primaryCTA {
	display: flex;
	width: 100%;
}

.secondaryCTA {
	display: flex;
	width: 100%;
	align-items: center;
}
</style>

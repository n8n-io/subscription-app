<script setup lang="ts">
import type { Plan, Product } from '@/Interface';
import { computed, ref, type Ref } from 'vue';
import {
	DEFAULT_ACTIVE_WORKFLOWS_OPTION,
	MORE_THAN_MAX_OPTION,
	SUPPORT_EMAIL,
	CURRENCY_USD,
} from '@/constants';
import { getColor } from '@/utils';

export interface Props {
	plan: Plan;
	product?: Product;
	defaultOption?: number;
	theme?: 'primary' | 'secondary' | 'tritiary';
	recommended?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	defaultOption: DEFAULT_ACTIVE_WORKFLOWS_OPTION,
	theme: 'primary',
});

const selected: Ref<string | number> = ref(props.defaultOption);

const emit = defineEmits<{
	(event: 'startTrial', productId: string, activeWorkflows: number): void;
}>();

const openMainSupport = () => {
	window.location.href = `mailto:${SUPPORT_EMAIL}`;
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
</script>

<template>
	<div
		:class="[
			$style.container,
			recommended ? $style.halfbordered : $style.fullbordered,
		]"
	>
		<div v-if="recommended" :class="$style.recommended">
			{{ $t('plan.recommended') }}
		</div>
		<div :class="$style.section">
			<div :class="$style.title">
				<h3 :class="theme">
					{{ $t(props.plan.nameKey) }}
				</h3>
			</div>
			<div :class="$style.description">
				{{ $t(props.plan.descriptionKey) }}
			</div>
		</div>
		<el-divider />
		<div :class="[$style.section, $style.pricingSection]">
			<div :class="$style.pricing">
				<span
					:class="$style.quote"
					v-if="
						props.plan.pricing === 'quote' ||
						MORE_THAN_MAX_OPTION === selected
					"
				>
					{{ $t('cta.contactUs') }}
				</span>
				<span v-else>
					<span :class="$style.superscript">
						{{ $t('pricing.dollars') }}
					</span>
					<span :class="$style.price">
						{{ plan.pricing === 'free' ? 0 : price }}
					</span>
					<span> {{ $t('pricing.permonth') }} </span>
				</span>
			</div>
			<div :class="$style.description">
				{{ $t('features.includes') }}
			</div>
			<div>
				<div v-if="props.plan.unlimited" :class="$style.unlimited">
					{{ $t('features.activeWorkflows.unlimited') }}
				</div>
				<div v-else :class="$style.select">
					<el-select
						size="large"
						placement="bottom"
						v-model="selected"
					>
						<el-option
							v-for="item in props.plan.options"
							:key="item.value"
							:value="item.value"
							:label="
								$t('features.activeWorkflows.count', {
									count:
										typeof item.value === 'number'
											? item.value * props.plan.unitSize
											: item.value,
								})
							"
							:class="$style.option"
						/>
					</el-select>
				</div>
			</div>
			<div :class="$style.extrasDescription">
				{{ $t('features.activeWorkflows.extras') }}
			</div>
		</div>
		<el-divider />
		<div :class="$style.section">
			<div v-if="plan.features" :class="$style.features">
				<div v-for="feature in plan.features" :key="feature.labelKey">
					<i class="far fa-check-circle tritiary"></i>
					<span>
						{{ $t(feature.labelKey) }}
					</span>
				</div>
			</div>
			<div :class="$style.cta">
				<div v-if="plan.primaryCTA" :class="$style.primaryButton">
					<el-button
						type="primary"
						size="large"
						v-if="
							plan.primaryCTA === 'email' ||
							selected === MORE_THAN_MAX_OPTION
						"
						:color="getColor(theme)"
						@click="openMainSupport"
					>
						{{ $t('cta.contactUs') }}
					</el-button>
					<el-button
						type="primary"
						size="large"
						v-else-if="plan.primaryCTA === 'start-trial'"
						:color="getColor(theme)"
						@click="onStartTrial"
					>
						{{ $t('cta.startFreeTrial') }}
					</el-button>
				</div>
				<div :class="$style.secondaryCTA">
					<span
						v-if="
							plan.secondaryCTA === 'email' &&
							selected !== MORE_THAN_MAX_OPTION
						"
						v-html="$t('cta.orContactUs')"
					>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" module>
.container {
	position: relative;
	max-width: 340px;
	background-color: var(--color-background-xlight);
	box-shadow: 0px 24px 72px rgba(0, 0, 0, 0.1);
	padding-top: 30px;
	padding-bottom: 30px;

	:global(.el-divider--horizontal) {
		margin: 30px 0;
	}
}

.fullbordered {
	border-radius: var(--border-radius-large);
}

.halfbordered {
	border-radius: 0 0 var(--border-radius-large) var(--border-radius-large);
}

.recommended {
	background-color: var(--color-primary);
	color: var(--color-text-xlight);
	position: absolute;
	width: 100%;
	height: 44px;
	top: -44px;
	border-radius: 8px 8px 0 0;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 700;
	font-size: 18px;
}

.section {
	padding: 0px 30px 0px 30px;
}

.pricingSection > * {
	margin-bottom: 20px;
}

.title {
	font-weight: 600;
	font-size: var(--font-size-l);
	text-align: center;
}

.description {
	text-align: center;
	font-size: var(--font-size-l);
	color: var(--color-text-light);
}

.extrasDescription {
	font-weight: 400;
	font-size: 18px;
	text-align: center;
	color: var(--color-text-dark);
}

.pricing {
	text-align: center;
	height: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: var(--color-text-dark);

	.quote {
		line-height: 42px;
		font-size: 40px;
		font-weight: 700;
	}

	.superscript {
		vertical-align: 80%;
		font-size: 26px;
		font-weight: 700;
	}

	.price {
		font-size: 80px;
		font-weight: 700;
	}
}

.select {
	:global(.el-select) {
		width: 100%;
	}

	input {
		color: var(--color-text-dark);
		font-size: var(--font-size-s);
		height: 60px;
		font-weight: 700;
		font-size: 18px;
	}
}

.option {
	min-height: 46px;
	display: flex;
	align-items: center;

	span {
		font-size: var(--font-size-xl);
	}
}

.unlimited {
	font-size: var(--font-size-s);
	text-align: center;
	border: var(--border-base);
	border-radius: var(--border-radius-base);
	height: 60px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 700;
	font-size: 18px;
	white-space: nowrap;
}

.features {
	min-height: 233px;

	> div {
		margin-bottom: 26px;
		display: flex;
		align-items: center;
	}

	svg {
		color: var(--color-success);
		margin-right: 16px;
		font-size: 24px;
	}

	span {
		font-weight: 700;
		font-size: 18px;
		color: var(--color-text-dark);
	}
}

.cta {
	text-align: center;

	> * {
		margin-bottom: var(--spacing-3xs);
	}
}

.primaryButton button {
	width: 100%;
}

.secondaryCTA {
	font-size: 18px;
	min-height: 24px;
}
</style>

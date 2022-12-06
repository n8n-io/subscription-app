<script setup lang="ts">
import type { Plan, Product } from '@/Interface';
import { computed, defineProps, ref, type Ref } from 'vue';
import {
	DEFAULT_ACTIVE_WORKFLOWS_OPTION,
	MORE_THAN_MAX_OPTION,
	SUPPORT_EMAIL,
	CURRENCY_USD,
} from '@/constants';

export interface Props {
	plan: Plan;
	product?: Product;
}

const selected: Ref<string | number> = ref(DEFAULT_ACTIVE_WORKFLOWS_OPTION);

const props = defineProps<Props>();

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

			return (
				basePrice +
				(monthlyPrice * selected.value) / activeWorkflow.units
			);
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
	<div :class="$style.container">
		<div :class="$style.section">
			<div :class="$style.title">
				{{ $t(props.plan.nameKey) }}
			</div>
			<div :class="$style.description">
				{{ $t(props.plan.descriptionKey) }}
			</div>
		</div>
		<div :class="$style.pricing">
			<span
				:class="$style.quote"
				v-if="
					props.plan.pricing === 'quote' ||
					MORE_THAN_MAX_OPTION === selected
				"
			>
				{{ $t('pricing.getquote') }}
			</span>
			<span v-else>
				<span :class="$style.superscript">
					{{ $t('pricing.dollars') }}
				</span>
				<span :class="$style.price" v-if="plan.pricing === 'free'">
					0
				</span>
				<span :class="$style.price" v-else> {{ price }} </span>
				<span> {{ $t('pricing.permonth') }} </span>
			</span>
		</div>
		<div :class="$style.section">
			<div :class="$style.description">
				{{ $t('features.includes') }}
			</div>
			<div>
				<div v-if="props.plan.unlimited" :class="$style.unlimited">
					{{ $t('features.activeWorkflows.unlimited') }}
				</div>
				<div v-else :class="$style.select">
					<el-select size="medium" v-model="selected">
						<el-option
							v-for="item in props.plan.options"
							:key="item.value"
							:value="item.value"
							:label="
								$t('features.activeWorkflows.count', {
									count: item.value,
								})
							"
						/>
					</el-select>
				</div>
			</div>
			<div :class="$style.description">
				{{ $t('features.activeWorkflows.extras') }}
			</div>
			<el-divider />
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
						size="medium"
						v-if="
							plan.primaryCTA === 'email' ||
							selected === MORE_THAN_MAX_OPTION
						"
						@click="openMainSupport"
					>
						{{ $t('cta.contactUs') }}
					</el-button>
					<el-button
						type="primary"
						size="medium"
						v-else-if="plan.primaryCTA === 'start-trial'"
						@click="onStartTrial"
					>
						{{ $t('cta.startFreeTrial') }}
					</el-button>
				</div>
				<div v-if="plan.secondaryCTA">
					<el-button
						v-if="
							plan.secondaryCTA === 'email' &&
							selected !== MORE_THAN_MAX_OPTION
						"
						size="medium"
						link
						@click="openMainSupport"
						>{{ $t('cta.contactUs') }}</el-button
					>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" module>
.container {
	min-width: 223px;
	max-width: 223px;
	padding: 40px 24px 12px 24px;
	border: var(--border-base);
	border-radius: var(--border-radius-large);
	background-color: var(--color-background-xlight);
}

.section {
	> * {
		margin-bottom: var(--spacing-2xs);
	}
}

.title {
	font-weight: 600;
	font-size: var(--font-size-m);
	text-align: center;
}

.description {
	text-align: center;
	font-size: var(--font-size-2xs);
}

.pricing {
	text-align: center;
	height: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.quote {
	font-size: var(--font-size-m);
	font-weight: 700;
	text-align: center;
	line-height: 42px;
}

.superscript {
	vertical-align: 80%;
}

.price {
	font-size: 42px;
	font-weight: 700;
}

.select input {
	font-size: var(--font-size-xs);
}

.unlimited {
	font-size: var(--font-size-xs);
	border: var(--border-base);
	border-radius: var(--border-radius-base);
	height: 32px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.features {
	min-height: 100px;

	> div {
		margin-bottom: var(--spacing-3xs);
	}

	svg {
		margin-right: var(--spacing-3xs);
	}

	span {
		font-weight: 600;
		font-size: var(--font-size-s);
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
</style>

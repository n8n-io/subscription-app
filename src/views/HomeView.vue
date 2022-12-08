<script setup lang="ts">
import PlanCard from '@/components/PlanCard.vue';
import CopyInput from '@/components/CopyInput.vue';
import {
	COMMUNITY_PLAN,
	DEFAULT_ACTIVE_WORKFLOWS_OPTION,
	ENTERPRISE_PLAN,
	TEAM_PLAN,
	TEAM_PLAN_NAME,
} from '@/constants';
import { computed, onMounted, ref, type Ref } from 'vue';
import { usePlansStore } from '@/stores/plans';
import type { LimitedPlan, Product, Subscription } from '@/Interface';
import { useSubscriptionsStore } from '@/stores/subscriptions';
import { isNumber } from '@/utils';

const loading = ref(true);
const plans: Ref<Product[]> = ref([]);
const plansStore = usePlansStore();
const subscriptionsStore = useSubscriptionsStore();

const subscription: Ref<Subscription | null> = ref(null);

const params = new URLSearchParams(window.location.search);
if (params.get('demo')) {
	subscription.value = {
		id: '42b7602b-cdc9-4cbc-a888-ff67cf1bb65a',
		reservationId: 'd18c737f-cd0a-4416-9750-c0211fd71292',
	};
}

const teamProduct = computed(() => {
	return plans.value.find(
		(plan) =>
			plan.metadata.planName === TEAM_PLAN_NAME &&
			plan.metadata.terms.billingFrequency === 'monthly'
	);
});

const defaultActiveWorkflows = ref(DEFAULT_ACTIVE_WORKFLOWS_OPTION);

function isValidOption(plan: LimitedPlan, value: number): boolean {
	return !!plan.options.find((option) => option.value === value);
}

onMounted(async () => {
	plans.value = await plansStore.getPlans();

	const teamProductId = teamProduct.value?.productId;
	const activeWorkflowPackages = params.get('activewfs') || '';
	if (
		teamProductId &&
		isNumber(activeWorkflowPackages) &&
		isValidOption(TEAM_PLAN, parseInt(activeWorkflowPackages))
	) {
		defaultActiveWorkflows.value = parseInt(activeWorkflowPackages);
	}

	loading.value = false;

	const checkout = params.get('checkout');
	if (checkout === 'team' && teamProductId) {
		await onStartTrial(teamProductId, defaultActiveWorkflows.value);
	}
});

async function onCheckout(checkoutSessionId: string, paddleCheckoutId: string) {
	subscription.value = await subscriptionsStore.createSubscription(
		checkoutSessionId,
		paddleCheckoutId
	);
}

async function onStartTrial(productId: string, activeWorkflows: number) {
	if (!window.Paddle) {
		return;
	}

	const checkoutSession = await plansStore.checkout(
		productId,
		activeWorkflows
	);

	window.Paddle.Setup({ vendor: checkoutSession.paddle.setup.vendor });

	if (checkoutSession.paddle.sandbox) {
		window.Paddle.Environment.set('sandbox');
	}

	window.Paddle.Checkout.open({
		override: checkoutSession.paddle.checkout.override,
		successCallback: (data) =>
			onCheckout(checkoutSession.id, data.checkout.id),
	});
}
</script>

<template>
	<h1 :class="$style.title">Pricing</h1>
	<div :class="$style.plans" v-if="!loading && !subscription">
		<PlanCard :plan="COMMUNITY_PLAN" />
		<PlanCard
			:plan="TEAM_PLAN"
			:product="teamProduct"
			:defaultOption="defaultActiveWorkflows"
			@start-trial="onStartTrial"
		/>
		<PlanCard :plan="ENTERPRISE_PLAN" />
	</div>
	<div v-if="subscription" :class="$style.confirmation">
		<div>
			<el-alert
				:title="$t('subscription.confirmation.title')"
				type="success"
				show-icon
				effect="dark"
				:closable="false"
			/>
		</div>
		<div :class="$style.copy">
			<label>{{ $t('subscription.copyactivation') }}</label>
			<CopyInput :value="subscription.reservationId" />
		</div>
	</div>
</template>

<style lang="scss" module>
.title {
	margin-bottom: var(--spacing-l);
	text-align: center;
}
.plans {
	display: flex;
	justify-content: center;

	> div + div {
		margin-left: var(--spacing-m);
	}
}

.confirmation {
	> * {
		margin-bottom: var(--spacing-s);
	}
}

.copy {
	max-width: 600px;

	label {
		font-weight: 600;
	}
}
</style>

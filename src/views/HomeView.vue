<script setup lang="ts">
import PlanCard from '@/components/PlanCard.vue';
import CopyInput from '@/components/CopyInput.vue';
import {
	COMMUNITY_PLAN,
	ENTERPRISE_PLAN,
	TEAM_PLAN,
	TEAM_PLAN_NAME,
} from '@/constants';
import { computed, onMounted, ref, type Ref } from 'vue';
import { usePlansStore } from '@/stores/plans';
import type { Product, Subscription } from '@/Interface';

const loading = ref(true);
const plans: Ref<Product[]> = ref([]);
const plansStore = usePlansStore();
// const subscription: Ref<Subscription | null> = ref(null);
const subscription: Ref<Subscription | null> = ref({
	id: '42b7602b-cdc9-4cbc-a888-ff67cf1bb65a',
	reservationId: 'd18c737f-cd0a-4416-9750-c0211fd71292',
});

onMounted(async () => {
	plans.value = await plansStore.getPlans();
	loading.value = false;
});

const teamProduct = computed(() => {
	return plans.value.find(
		(plan) =>
			plan.metadata.planName === TEAM_PLAN_NAME &&
			plan.metadata.terms.billingFrequency === 'monthly'
	);
});

async function onCheckout(checkoutSessionId: string, paddleCheckoutId: string) {
	subscription.value = await plansStore.createSubscription(
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
	<div :class="$style.plans" v-if="!loading && !subscription">
		<PlanCard :plan="COMMUNITY_PLAN" />
		<PlanCard
			:plan="TEAM_PLAN"
			:product="teamProduct"
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
		<CopyInput :class="$style.copy" :value="subscription.reservationId" />
	</div>
</template>

<style lang="scss" module>
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
}
</style>

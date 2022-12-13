<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import PlanCard from '@/components/PlanCard.vue';
import CopyInput from '@/components/CopyInput.vue';
import {
	COMMUNITY_PLAN,
	DEFAULT_ACTIVE_WORKFLOWS_OPTION,
	ENTERPRISE_PLAN,
	TEAM_PLAN,
	TEAM_PLAN_NAME,
	PLANS_FAQ,
} from '@/constants';
import { computed, onMounted, ref, type Ref } from 'vue';
import { usePlansStore } from '@/stores/plans';
import type {
	LimitedPlan,
	Product,
	Subscription,
	PaddleCheckoutSuccess,
} from '@/Interface';
import { useSubscriptionsStore } from '@/stores/subscriptions';
import { isNumber } from '@/utils';
import { ElNotification } from 'element-plus';
import FAQuestion from '@/components/FAQuestion.vue';
import telemetry from '../utils/telemetry';

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

const callbackParam = params.get('callback');
const callbackUrl = callbackParam ? decodeURIComponent(callbackParam) : '';

const instanceId = params.get('instanceid');

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
	telemetry.page('plans', 'plans');
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
	try {
		subscription.value = await subscriptionsStore.createSubscription(
			checkoutSessionId,
			paddleCheckoutId
		);
	} catch (e) {
		if (e instanceof Error) {
			ElNotification({
				message: e.message,
				type: 'error',
				position: 'bottom-right',
				showClose: false,
			});
		}
	}
}

function trackButtonClicked(
	action: 'team_get_started' | 'enterprise_contact_us' | 'team_contact_us '
) {
	telemetry.track('User clicked button on plans page', {
		action,
		...(instanceId ? { instance_id: instanceId } : {}),
	});
}

function trackCheckout(data: {
	successEvent: PaddleCheckoutSuccess;
	quota: number;
}) {
	const params: { [key: string]: string } = {
		quota: `${data.quota}`,
	};
	if (data.successEvent.product) {
		params.plan_name_current = data.successEvent.product.name;
	}

	if (instanceId) {
		params.instance_id = instanceId;
	}
	if (data.successEvent.user?.email) {
		params.email = data.successEvent.user.email;
	}
	telemetry.track('User submitted payment details successfully', params);
}

async function onStartTrial(productId: string, activeWorkflows: number) {
	trackButtonClicked('team_get_started');

	if (!window.Paddle) {
		return;
	}

	try {
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
			successCallback: (data) => {
				onCheckout(checkoutSession.id, data.checkout.id);
				trackCheckout({
					successEvent: data,
					quota: activeWorkflows,
				});
			},
		});
	} catch (e) {
		if (e instanceof Error) {
			ElNotification({
				message: e.message,
				type: 'error',
				position: 'bottom-right',
				showClose: false,
			});
		}
	}
}

function redirectToActivate() {
	if (subscription.value && callbackUrl) {
		const url = new URL(callbackUrl);
		url.searchParams.set('key', subscription.value.reservationId);
		window.location.href = url.toString();
	}
}
</script>

<template>
	<DefaultLayout :title="subscription? $t('subscription.confirmation.title'): $t('subscription.plans.title')">
		<div v-if="!loading && !subscription">
			<div :class="$style.plans">
				<PlanCard :plan="COMMUNITY_PLAN" />
				<PlanCard
					:plan="TEAM_PLAN"
					:product="teamProduct"
					:defaultOption="defaultActiveWorkflows"
					@start-trial="onStartTrial"
				/>
				<PlanCard :plan="ENTERPRISE_PLAN" />
			</div>
			<div :class="$style.faq">
				<h2>{{ $t('faq') }}</h2>
				<div v-for="question in PLANS_FAQ" :key="question.questionKey">
					<FAQuestion :question="question" />
				</div>
			</div>
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
			<div v-if="callbackUrl">
				<el-button
					type="primary"
					size="large"
					@click="redirectToActivate"
					>{{ $t('subscription.activateRedirect.cta') }}</el-button
				>
			</div>
			<div :class="$style.copy">
				<label v-if="callbackUrl">{{
					$t('subscription.copyactivation.redirect')
				}}</label>
				<label v-else>{{ $t('subscription.copyactivation') }}</label>
				<CopyInput :value="subscription.reservationId" />
			</div>
		</div>
	</DefaultLayout>
</template>

<style lang="scss" module>
.plans {
	display: flex;
	justify-content: center;
	margin-bottom: var(--spacing-l);

	> div + div {
		margin-left: var(--spacing-m);
	}
}

.confirmation {
	> * {
		margin-bottom: var(--spacing-xs);
	}

	> *:first-child {
		margin-bottom: var(--spacing-xl);
	}
}

.copy {
	max-width: 600px;

	label {
		font-weight: 600;
	}
}

.faq {
	margin-bottom: var(--spacing-l);

	> * {
		margin-bottom: var(--spacing-s);
	}
}
</style>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import PlanCard from '@/components/PlanCard.vue';
import CopyInput from '@/components/CopyInput.vue';
import {
	COMMUNITY_PLAN,
	DEFAULT_ACTIVE_WORKFLOWS_OPTION,
	ENTERPRISE_PLAN,
	STARTUP_PLAN,
	STARTUP_PLAN_NAME,
	PLANS_FAQ,
} from '@/constants';
import { computed, onMounted, ref, type Ref, watch } from 'vue';
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
import InfoCard from '@/components/InfoCard.vue';
import InfoBanner from '@/components/InfoBanner.vue';

const loadingPlans = ref(true);
const plans: Ref<Product[]> = ref([]);
const plansStore = usePlansStore();
const subscriptionsStore = useSubscriptionsStore();

const error: Ref<boolean> = ref(false);
const waitingForSubscription: Ref<boolean> = ref(false);
const subscription: Ref<Subscription | null> = ref(null);

const params = new URLSearchParams(window.location.search);
const callbackParam = params.get('callback');
const callbackUrl = callbackParam ? decodeURIComponent(callbackParam) : '';

const instanceId = params.get('instanceid');
const source = params.get('source');

const startupProduct = computed(() => {
	return plans.value.find(
		(plan) =>
			plan.metadata.planName === STARTUP_PLAN_NAME &&
			plan.metadata.terms.billingFrequency === 'monthly'
	);
});

const defaultActiveWorkflows = ref(DEFAULT_ACTIVE_WORKFLOWS_OPTION);

function isValidOption(plan: LimitedPlan, value: number): boolean {
	return !!plan.options.find((option) => option.value === value);
}

onMounted(async () => {
	telemetry.page('plans', 'plans');
	telemetry.track('User Landed On Plans Page', {
		...(instanceId ? { instance_id: instanceId } : {}),
		...(source ? { source } : {}),
	});

	try {
		plans.value = await plansStore.getPlans();
	} catch (e) {
		error.value = true;

		return;
	}

	const startupProductId = startupProduct.value?.productId;
	const activeWorkflowPackages = params.get('activewfs') || '';
	if (
		startupProductId &&
		isNumber(activeWorkflowPackages) &&
		isValidOption(STARTUP_PLAN, parseInt(activeWorkflowPackages))
	) {
		defaultActiveWorkflows.value = parseInt(activeWorkflowPackages);
	}

	loadingPlans.value = false;

	const checkout = params.get('checkout');
	if (checkout === 'startup' && startupProductId) {
		await onStartTrial(startupProductId, defaultActiveWorkflows.value);
	}
});

watch(waitingForSubscription, (waiting) => {
	if (waiting) {
		scrollToTop();
	}
});

function scrollToTop() {
	document.body.scrollTop = document.documentElement.scrollTop = 0;
}

async function onCheckout(checkoutSessionId: string, paddleCheckoutId: string) {
	try {
		waitingForSubscription.value = true;
		subscription.value = await subscriptionsStore.createSubscription(
			checkoutSessionId,
			paddleCheckoutId
		);
		waitingForSubscription.value = false;
	} catch (e) {
		waitingForSubscription.value = false;
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
	action:
		| 'startup_get_started'
		| 'enterprise_contact_us'
		| 'startup_contact_us'
) {
	telemetry.track('User clicked button on plans page', {
		action,
		...(instanceId ? { instance_id: instanceId } : {}),
		...(source ? { source } : {}),
	});
}

function trackCheckout(data: {
	successEvent: PaddleCheckoutSuccess;
	quota: number;
}) {
	const params: { [key: string]: string | number | {} } = {
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

	const item = data.successEvent?.checkout?.prices?.customer?.items?.[0];
	if (item) {
		params.initial_line_price = item.line_price;
		params.initial_discounts = item.discounts;
		if (item.recurring) {
			params.recurring_period = item.recurring.period;
			params.recurring_interval = item.recurring.interval;
			params.recurring_trial_days = item.recurring.trial_days;
			params.recurring_currency = item.recurring.currency;
			params.recurring_line_price = item.recurring.line_price;
			params.recurring_discounts = item.recurring.discounts;
			params.recurring_tax_rate = item.recurring.tax_rate;
		}
	}

	telemetry.track('User submitted payment details successfully', params);
}

async function onStartTrial(productId: string, activeWorkflows: number) {
	trackButtonClicked('startup_get_started');

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

function onStartupContactUs() {
	trackButtonClicked('startup_contact_us');
}

function onEnterpriseContactUs() {
	trackButtonClicked('enterprise_contact_us');
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
	<DefaultLayout
		:title="
			subscription
				? $t('subscription.confirmation.title')
				: $t('subscription.plans.title')
		"
	>
		<InfoBanner v-if="error" theme="danger">
			{{ $t('error.somethingWentWrong') }}
		</InfoBanner>
		<div
			v-if="subscription || waitingForSubscription"
			:class="$style.confirmation"
		>
			<div>
				<InfoBanner>
					<span
						v-html="$t('subscription.confirmation.message')"
					></span>
				</InfoBanner>
			</div>

			<InfoCard :class="$style.copy" :loading="waitingForSubscription">
				<div>
					<label v-if="callbackUrl">{{
						$t('subscription.copyactivation.title')
					}}</label>
					<label v-else>{{
						$t('subscription.copyactivation')
					}}</label>
				</div>
				<CopyInput
					:value="subscription ? subscription.reservationId : ''"
				/>
			</InfoCard>

			<div v-if="callbackUrl && subscription">
				<el-button
					type="primary"
					size="large"
					@click="redirectToActivate"
					>{{ $t('subscription.activateRedirect.cta') }}</el-button
				>
			</div>
		</div>
		<div v-else-if="!loadingPlans" :class="$style.container">
			<div :class="$style.plans">
				<PlanCard :plan="COMMUNITY_PLAN" theme="secondary" />
				<PlanCard
					:plan="STARTUP_PLAN"
					:product="startupProduct"
					:defaultOption="defaultActiveWorkflows"
					:recommended="false"
					@start-trial="onStartTrial"
					@contact-us="onStartupContactUs"
				/>
				<PlanCard
					:plan="ENTERPRISE_PLAN"
					theme="tritiary"
					@contact-us="onEnterpriseContactUs"
				/>
			</div>
			<div :class="$style.faq">
				<h1>{{ $t('faq') }}</h1>
				<div v-for="question in PLANS_FAQ" :key="question.questionKey">
					<FAQuestion :question="question" />
				</div>
			</div>
		</div>
	</DefaultLayout>
</template>

<style lang="scss" module>
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.plans {
	display: flex;
	justify-content: center;
	margin-bottom: 130px;
	padding-top: 44px;

	> div + div {
		margin-left: var(--spacing-m);
	}
}

.confirmation {
	max-width: 810px;
	margin: auto;

	> * {
		margin-bottom: var(--spacing-xs);
	}

	> *:first-child {
		margin-bottom: var(--spacing-xl);
	}
}

.copy {
	width: 100%;
	padding: 27px 30px;
	background-color: var(--color-background-xlight);
	border-radius: 8px;
	margin-bottom: 18px;
	border: 1px solid var(--color-foreground-base);

	> div:first-child {
		margin-bottom: 20px;
	}

	label {
		font-weight: 600;
	}
}

.faq {
	margin-bottom: var(--spacing-l);
	width: 808px;

	h1 {
		text-align: center;
		margin-bottom: 48px;
	}

	> * {
		margin-bottom: var(--spacing-s);
	}
}
</style>

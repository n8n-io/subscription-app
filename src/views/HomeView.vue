<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import PlanCard from '@/components/PlanCard.vue';
import CopyInput from '@/components/CopyInput.vue';
import InfoCard from '@/components/InfoCard.vue';
import InfoBanner from '@/components/InfoBanner.vue';
import BadgePill from '@/components/BadgePill.vue';
import IconQuestion from '@/components/icons/IconQuestion.vue';
import ContentHeading from '@/components/ContentHeading.vue';
import FAQuestion from '@/components/FAQuestion.vue';
import VButton from '@/components/VButton.vue';
import {
	COMMUNITY_PLAN,
	DEFAULT_ACTIVE_WORKFLOWS_OPTION,
	ENTERPRISE_PLAN,
	STARTUP_PLAN,
	STARTUP_PLAN_NAME,
	PLANS_FAQ,
} from '@/constants';
import { computed, onMounted, ref, watch } from 'vue';
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
import telemetry from '../utils/telemetry';

const loadingPlans = ref(true);
const plans = ref<Product[]>([]);
const plansStore = usePlansStore();
const subscriptionsStore = useSubscriptionsStore();

const error = ref(false);
const waitingForSubscription = ref(false);
const subscription = ref<Subscription | null>(null);

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

function onCommunityGetStarted() {
	const url = new URL('https://github.com/n8n-io/n8n');
	window.location.href = url.toString();
}

function redirectToActivate() {
	if (subscription.value && callbackUrl) {
		const url = new URL(callbackUrl);
		url.searchParams.set('key', subscription.value.reservationId);
		window.location.href = url.toString();
	}
}
</script>

<template
	:title="
		subscription
			? $t('subscription.confirmation.title')
			: $t('subscription.plans.title')
	"
>
	<DefaultLayout :title="$t('subscription.plans.title')">
		<InfoBanner v-if="error" theme="danger" :class="[$style.errorBanner]">
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

			<div v-if="callbackUrl && subscription" :class="$style.activateCTA">
				<VButton variant="primary" @click="redirectToActivate">{{
					$t('subscription.activateRedirect.cta')
				}}</VButton>
			</div>
		</div>
		<div v-else-if="!loadingPlans">
			<div :class="[$style.pricingToggle]">
				<ToggleSwitch v-model="isAnnual" class="gap-2">
					<template #label-left>
						<p>Monthly</p>
					</template>
					<template #label-right>
						<p>Annually</p>
					</template>
				</ToggleSwitch>
			</div>
			<div :class="[$style.plans, $style.inner_container]">
				<div :class="[$style.layer]" />
				<PlanCard
					:plan="COMMUNITY_PLAN"
					badgeVariant="dark"
					@get-started="onCommunityGetStarted"
				/>
				<PlanCard
					:plan="STARTUP_PLAN"
					:product="startupProduct"
					:defaultOption="defaultActiveWorkflows"
					:recommended="false"
					@start-trial="onStartTrial"
					@contact-us="onStartupContactUs"
					badgeVariant="pink"
				/>
				<PlanCard
					:plan="ENTERPRISE_PLAN"
					@contact-us="onEnterpriseContactUs"
					badgeVariant="orange"
					theme="dark"
				/>
			</div>
		</div>

		<!-- FAQ section -->
		<template #faq>
			<div :class="$style.faq">
				<div :class="$style.faq__inner">
					<div :class="$style.faq__header">
						<BadgePill variant="black">
							<template #icon>
								<IconQuestion />
							</template>
							FAQs
						</BadgePill>
						<ContentHeading :class="[$style.faq__title]">{{
							$t('faq')
						}}</ContentHeading>
					</div>
					<div :class="$style.faq__content">
						<div
							v-for="(question, index) in PLANS_FAQ"
							:key="index"
						>
							<FAQuestion :question="question" />
						</div>
					</div>
				</div>
			</div>
		</template>
	</DefaultLayout>
</template>

<style lang="scss" module>
.inner_container {
	padding: var(--spacing-5xl) var(--spacing-9xl);

	@media (max-width: 1321px) {
		padding: var(--spacing-5xl) var(--spacing-s);
	}
}

.pricingToggle {
	display: flex;
	justify-content: center;
}

.plans {
	display: flex;
	justify-content: space-between;
	position: relative;
	gap: var(--spacing-s);

	@media (max-width: 992px) {
		flex-direction: column;
		max-width: 555px;
		margin: 0 auto;
	}
}

.layer {
	position: absolute;
	background-image: url('@/assets/bg-pattern.png');
	background-repeat: no-repeat;
	background-size: cover;
	width: 1433px;
	height: 1022px;
	filter: blur(75px);
	right: -318px;
	bottom: -284px;
	background-position: 50%;
	overflow: hidden;
	opacity: 0.5;

	@media (max-width: 992px) {
		right: 4px;
		top: 34px;
		bottom: 0;
		transform: rotate(0deg);
		width: 100%;
		height: initial;
		background-size: 170% 551%;
		background-position: -137px -1828px;
	}
}

.errorBanner {
	margin: 0 16px;
}

.confirmation {
	max-width: 810px;
	margin: auto;
	padding: 16px;

	> * {
		margin-bottom: var(--spacing-xs);
		background-color: transparent !important;
	}

	> *:first-child {
		margin-bottom: var(--spacing-xl);
	}
}

.activateCTA {
	max-width: 300px;
	margin: 0 auto;
	padding: 0 var(--spacing-s);
}

.copy {
	width: 100%;
	padding: var(--spacing-l) var(--spacing-xl);
	background-color: var(--color-background-xlight);
	border-radius: var(--border-radius-sm);
	margin-bottom: var(--spacing-m);
	border: 1px solid var(--color-foreground-base);

	> div:first-child {
		margin-bottom: var(--spacing-m);
	}

	label {
		font-weight: 600;
	}
}

.faq {
	background: var(--gradient-dark);

	@media (max-width: 992px) {
		background: transparent;
	}

	&__inner {
		padding: var(--spacing-7xl);
		display: flex;
		max-width: 1440px;
		margin: 0 auto;
		justify-content: space-between;
		gap: var(--spacing-2xl);

		@media (max-width: 992px) {
			flex-direction: column;
			padding: var(--spacing-5xl) var(--spacing-s);
			gap: var(--spacing-5xl);
		}
	}

	&__header {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--spacing-xs);
		max-width: 448px;
	}

	&__title {
		@media (max-width: 992px) {
			font-size: 38px;
			line-height: 110%;
		}
	}

	&__content {
		display: flex;
		flex-direction: column;
		flex: 1;
	}
}
</style>

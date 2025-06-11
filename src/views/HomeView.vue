<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import StaticPlanCard from '@/components/StaticPlanCard.vue';
import CopyInput from '@/components/CopyInput.vue';
import InfoCard from '@/components/InfoCard.vue';
import InfoBanner from '@/components/InfoBanner.vue';
import BadgePill from '@/components/BadgePill.vue';
import IconQuestion from '@/components/icons/IconQuestion.vue';
import ContentHeading from '@/components/ContentHeading.vue';
import FAQuestion from '@/components/FAQuestion.vue';
import VButton from '@/components/VButton.vue';
import ToggleSwitch from '@/components/ToggleSwitch.vue';
import { STATIC_PLANS, PLANS_FAQ } from '@/constants';
import { onMounted, ref, watch } from 'vue';
import type { Subscription, PaddleCheckoutSuccess } from '@/Interface';
import { openPaddleCheckout } from '@/api/paddleCheckout';
import { getEnvironmentConfig } from '@/utils/environment';
import { ElNotification } from 'element-plus';
import telemetry from '../utils/telemetry';

const waitingForSubscription = ref(false);
const subscription = ref<Subscription | null>(null);
const error = ref<string | null>(null);
const loadingPlans = ref(false);

const params = new URLSearchParams(window.location.search);
const callbackParam = params.get('callback');
const callbackUrl = callbackParam ? decodeURIComponent(callbackParam) : '';

const instanceId = params.get('instanceid');
const source = params.get('source');

const isAnnual = ref(false);
const envConfig = getEnvironmentConfig();

onMounted(async () => {
	telemetry.page('plans', 'plans');
	telemetry.track('User Landed On Plans Page', {
		...(instanceId ? { instance_id: instanceId } : {}),
		...(source ? { source } : {}),
	});
});

watch(waitingForSubscription, (waiting) => {
	if (waiting) {
		scrollToTop();
	}
});

function scrollToTop() {
	document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function trackButtonClicked(
	action:
		| 'startup_get_started'
		| 'business_get_started'
		| 'enterprise_contact_us'
		| 'startup_contact_us'
		| 'business_contact_us'
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

async function onSubscribe(priceId: string, executions: number) {
	trackButtonClicked('business_get_started');

	if (!window.Paddle) {
		return;
	}

	try {
		await openPaddleCheckout({
			productId: priceId,
			successCallback: (data) => {
				trackCheckout({
					successEvent: data,
					quota: executions,
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

function onBusinessContactUs() {
	trackButtonClicked('business_contact_us');
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
			<div v-if="envConfig.isSandbox" :class="$style.environmentBadge">
				<span :class="$style.badge"
					>{{ envConfig.displayName }} Mode</span
				>
			</div>
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
				<StaticPlanCard
					:plan="STATIC_PLANS.community"
					badgeVariant="dark"
					@get-started="onCommunityGetStarted"
				/>
				<StaticPlanCard
					:plan="{
						...STATIC_PLANS.business,
						price: STATIC_PLANS.business.basePrice,
					}"
					:isAnnual="isAnnual"
					:recommended="true"
					@start-trial="onSubscribe"
					@contact-us="onBusinessContactUs"
					badgeVariant="pink"
				/>
				<StaticPlanCard
					:plan="STATIC_PLANS.enterprise"
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

.environmentBadge {
	display: flex;
	justify-content: center;
	margin-bottom: var(--spacing-s);
}

.badge {
	background: rgba(255, 193, 7, 0.2);
	color: #ffc107;
	padding: var(--spacing-2xs) var(--spacing-xs);
	border-radius: var(--border-radius-sm);
	font-size: var(--font-size-xs);
	font-weight: 500;
	border: 1px solid rgba(255, 193, 7, 0.3);
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

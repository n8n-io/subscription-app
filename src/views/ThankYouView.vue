<script setup lang="ts">
import InfoCard from '@/components/InfoCard.vue';
import InfoBanner from '@/components/InfoBanner.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { onMounted, ref } from 'vue';

const subscriptionToken = ref('');

onMounted(() => {
	const params = new URLSearchParams(window.location.search);

	const token = params.get('token');
	if (token) {
		subscriptionToken.value = token;
	}
});

function goToManagement() {
	if (subscriptionToken.value) {
		window.location.href = `/manage?token=${subscriptionToken.value}`;
	}
}
</script>

<template>
	<DefaultLayout :title="$t('thankYou.title')">
		<div :class="$style.container">
			<div :class="$style.thankYouContent">
				<InfoBanner theme="success">
					{{ $t('thankYou.success.message') }}
				</InfoBanner>

				<InfoCard :class="$style.infoCard">
					<div :class="$style.content">
						<h3 :class="$style.heading">
							{{ $t('thankYou.nextSteps.title') }}
						</h3>

						<div :class="$style.step">
							<h4 :class="$style.stepTitle">
								{{ $t('thankYou.nextSteps.step1.title') }}
							</h4>
							<p :class="$style.stepDescription">
								{{ $t('thankYou.nextSteps.step1.description') }}
							</p>
						</div>

						<div :class="$style.step">
							<h4 :class="$style.stepTitle">
								{{ $t('thankYou.nextSteps.step2.title') }}
							</h4>
							<p
								:class="$style.stepDescription"
								v-html="
									$t('thankYou.nextSteps.step2.description')
								"
							></p>
						</div>

						<div :class="$style.step">
							<h4 :class="$style.stepTitle">
								{{ $t('thankYou.nextSteps.step3.title') }}
							</h4>
							<p
								:class="$style.stepDescription"
								v-html="
									$t('thankYou.nextSteps.step3.description')
								"
							></p>
						</div>

						<div :class="$style.actions">
							<VButton
								v-if="subscriptionToken"
								@click="goToManagement"
							>
								{{
									$t('thankYou.actions.manageSubscription')
								}}</VButton
							>
						</div>
					</div>
				</InfoCard>

				<InfoCard :class="$style.supportCard">
					<div :class="$style.supportContent">
						<h3 :class="$style.heading">
							{{ $t('thankYou.support.title') }}
						</h3>
						<p v-html="$t('thankYou.support.description')"></p>
					</div>
				</InfoCard>
			</div>
		</div>
	</DefaultLayout>
</template>

<style lang="scss" module>
.container {
	margin: auto;
	max-width: 809px;
}

.thankYouContent {
	> * {
		margin-bottom: 24px;
	}
}

.infoCard {
	margin-bottom: 24px;
}

.content {
	line-height: 1.6;
}

.heading {
	margin: 0 0 24px 0;
	color: var(--color-white);
	font-size: 24px;
	font-weight: 600;
}

.step {
	margin-bottom: 24px;
	padding-bottom: 16px;
	border-bottom: 1px solid var(--color-foreground-base);

	&:last-child {
		border-bottom: none;
		margin-bottom: 32px;
	}
}

.stepTitle {
	margin: 0 0 8px 0;
	color: var(--color-white);
	font-size: 18px;
}

.stepDescription {
	margin: 0;
	color: var(--color-paragraphs);
	font-size: 16px;
}

.actions {
	display: flex;
	justify-content: center;
	margin-top: 32px;
	max-width: 300px;
	align-items: center;
	margin-left: auto;
	margin-right: auto;
}

.supportCard {
	background: var(--color-background-darker);
	border: 1px solid var(--color-foreground-light);
}

.supportContent {
	text-align: center;
}
</style>

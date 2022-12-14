<script setup lang="ts">
import { useSubscriptionsStore } from '@/stores/subscriptions';
import InfoCard from '@/components/InfoCard.vue';
import InfoBanner from '@/components/InfoBanner.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { ElNotification, ElMessageBox } from 'element-plus';
import { onMounted, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import telemetry from '../utils/telemetry';

const i18n = useI18n();
const subscriptionsStore = useSubscriptionsStore();

const managementToken = ref('');
const cancelled: Ref<null | { daysLeft: number }> = ref(null);

onMounted(() => {
	const params = new URLSearchParams(window.location.search);

	const token = params.get('token');
	if (token) {
		managementToken.value = token;
	}

	telemetry.page('manage', 'management page');
});

async function cancelSubscription() {
	try {
		const resp = await subscriptionsStore.cancelSubscription(
			managementToken.value
		);

		const diffInMs = new Date(resp.expiry).getTime() - new Date().getTime();
		const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
		const daysLeft = Math.max(diffInDays, 0);

		cancelled.value = {
			daysLeft,
		};
	} catch (e) {
		if (e instanceof Error) {
			ElNotification({
				type: 'error',
				message: e.message,
				position: 'bottom-right',
				showClose: false,
			});
		}
	}
}

async function onCancel() {
	try {
		await ElMessageBox.confirm(i18n.t('management.cancel.confirm'), {
			confirmButtonText: i18n.t('management.cancel.cancel'),
			type: 'warning',
			showCancelButton: false,
		});

		await cancelSubscription();
	} catch (e) {
		// nada
	}
}
</script>

<template>
	<DefaultLayout
		:title="
			cancelled
				? $t('management.cancelled.title')
				: $t('management.title')
		"
	>
		<div v-if="!managementToken" :class="$style.container">
			<InfoBanner theme="danger">{{
				$t('management.error.missingToken')
			}}</InfoBanner>
		</div>
		<div :class="$style.container" v-else>
			<div v-if="cancelled" :class="$style.cancelled">
				<InfoBanner>{{
					$t(
						cancelled.daysLeft === 0
							? 'management.cancel.success.soon'
							: 'management.cancel.success',
						{
							days: cancelled.daysLeft,
						}
					)
				}}</InfoBanner>

				<InfoCard>
					<span v-html="$t('management.cancel.info')"></span>
				</InfoCard>
			</div>
			<InfoCard v-else>
				<span v-html="$t('management.cta.1')"></span>
				<a @click="onCancel"> {{ $t('management.cta.2') }}</a
				>{{ $t('management.cta.3') }}
			</InfoCard>
		</div>
	</DefaultLayout>
</template>

<style lang="scss" module>
.container {
	margin: auto;
	max-width: 809px;

	label {
		font-weight: 600;
	}
}
.cancelled {
	> * {
		margin-bottom: 15px;
	}
}
</style>

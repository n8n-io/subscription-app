<script setup lang="ts">
// import { useSubscriptionsStore } from '@/stores/subscriptions';
import { ElNotification, ElMessageBox } from 'element-plus';
import { onMounted, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import telemetry from '../utils/telemetry';

const i18n = useI18n();
// const subscriptionsStore = useSubscriptionsStore();

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
		// todo enable once endpoint is ready
		// await subscriptionsStore.cancelSubscription(managementToken.value);

		cancelled.value = {
			daysLeft: 2,
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
	<div v-if="!managementToken">
		<el-alert type="error" show-icon effect="dark" :closable="false">{{
			$t('management.error.missingToken')
		}}</el-alert>
	</div>
	<div :class="$style.container" v-else>
		<h1>Manage Plan</h1>
		<div v-if="cancelled">
			<el-alert
				type="success"
				show-icon
				effect="dark"
				:closable="false"
				>{{
					$t('management.cancel.success', {
						days: cancelled.daysLeft,
					})
				}}</el-alert
			>
		</div>
		<div v-else>
			<label>{{ $t('management.cancel.title') }}</label>
			<div>
				<el-button size="default" @click="onCancel">{{
					$t('management.cancel.cta')
				}}</el-button>
			</div>
		</div>
	</div>
</template>

<style lang="scss" module>
.container {
	label {
		font-weight: 600;
	}
}
</style>

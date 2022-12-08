<script setup lang="ts">
import { useSubscriptionsStore } from '@/stores/subscriptions';
import { ElNotification, ElMessageBox } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();
const subscriptionsStore = useSubscriptionsStore();

const managementToken = ref('');

onMounted(() => {
	const params = new URLSearchParams(window.location.search);

	const token = params.get('token');
	if (token) {
		managementToken.value = token;
	}
});

async function cancelSubscription() {
	try {
		await subscriptionsStore.cancelSubscription(managementToken.value);

		ElNotification({
			type: 'success',
			message: i18n.t('management.cancel.cancelled'),
			position: 'bottom-right',
			showClose: false,
		});
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
		<div>
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
	h1 {
		margin-bottom: var(--spacing-l);
	}

	label {
		font-weight: 600;
	}
}
</style>

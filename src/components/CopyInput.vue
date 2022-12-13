<script setup lang="ts">
import { ElNotification } from 'element-plus';
import { useI18n } from 'vue-i18n';

export interface Props {
	value: string;
}

const i18n = useI18n();

const props = defineProps<Props>();

async function onCopy() {
	try {
		await navigator.clipboard.writeText(props.value);
		ElNotification({
			message: i18n.t('generic.copied'),
			type: 'success',
			position: 'bottom-right',
			showClose: false,
		});
	} catch (e: unknown) {
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
</script>

<template>
	<el-card shadow="hover" :class="$style.card" @click="onCopy">
		<div>
			{{ value }}
		</div>
		<div :class="$style.copy">{{ $t('generic.copy') }}</div>
	</el-card>
</template>

<style lang="scss" module>
.card {
	cursor: pointer;
	flex-direction: row;
	background-color: var(--color-foreground-light) !important;
	border: 1px solid var(--color-foreground-base);

	> *:first-child {
		display: flex;

		*:first-child {
			flex-grow: 1;
		}
	}

	.copy {
		font-size: var(--font-size-m);
		color: var(--color-text-light);
		visibility: hidden;
	}

	&:hover .copy {
		visibility: visible;
	}
}
</style>

<script setup lang="ts">
import type { FAQ } from '@/Interface';
import { ref } from 'vue';

export interface Props {
	question: FAQ;
}

const collapsed = ref(true);

defineProps<Props>();

function toggle() {
	collapsed.value = !collapsed.value;
}
</script>

<template>
	<div :class="$style.question" :key="question.questionKey">
		<div :class="$style.toggle" @click="toggle">
			<i
				:class="[
					'fas',
					collapsed ? 'fa-chevron-right' : 'fa-chevron-down',
				]"
			></i>
		</div>
		<div>
			<h3 @click="toggle">
				{{ $t(question.questionKey) }}
			</h3>
			<div v-if="!collapsed" :class="$style.answer">
				{{ $t(question.answerKey) }}
			</div>
		</div>
	</div>
	<el-divider />
</template>

<style lang="scss" module>
.question {
	display: flex;

	h3 {
		color: var(--color-text-dark);
		cursor: pointer;
		font-weight: 700;
		font-size: 22px;
	}
}

.answer {
	margin-top: 10px;
	font-weight: 400;
	font-size: 18px;
	line-height: 24px;
}

.toggle {
	margin-right: 32px;
	font-size: var(--font-size-l);
	cursor: pointer;
}
</style>

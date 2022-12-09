<script setup lang="ts">
import type { FAQ } from '@/Interface';
import { defineProps, ref } from 'vue';

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
		<h3 @click="toggle">
			<i
				:class="[
					'fas',
					collapsed ? 'fa-chevron-right' : 'fa-chevron-down',
				]"
			></i>
			{{ $t(question.questionKey) }}
		</h3>
		<div v-if="!collapsed">{{ $t(question.answerKey) }}</div>
	</div>
</template>

<style lang="scss" module>
.question {
	h3 {
		font-weight: 600;
		cursor: pointer;

		svg {
			font-size: var(--font-size-s);
		}
	}
}
</style>

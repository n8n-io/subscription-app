<script setup lang="ts">
import type { FAQ } from '@/Interface';
import { ref, nextTick } from 'vue';

export interface Props {
	question: FAQ;
}

defineProps<Props>();
const collapsed = ref(true);
const maxHeight = ref('0px');
const contentVisible = ref(false);
const answer = ref<HTMLElement | null>(null);
const answerWrapper = ref<HTMLElement | null>(null);

function toggle() {
	collapsed.value = !collapsed.value;

	if (!collapsed.value) {
		contentVisible.value = true;

		nextTick(() => {
			if (answer.value && answerWrapper.value) {
				const contentHeight = answer.value.scrollHeight;
				maxHeight.value = `${contentHeight}px`;
			}
		});
	} else {
		maxHeight.value = '0px';

		setTimeout(() => {
			contentVisible.value = false;
		}, 400);
	}
}
</script>

<template>
	<div :class="$style.faq" :key="question.questionKey">
		<div :class="$style.faq__content">
			<h3
				@click="toggle"
				:class="[
					$style.faq__title,
					{ [$style['faq__title--active']]: !collapsed },
				]"
			>
				{{ $t(question.questionKey) }}
			</h3>

			<div
				:class="[$style.faq__answerWrapper]"
				ref="answerWrapper"
				:style="{ height: maxHeight }"
			>
				<div
					v-if="contentVisible"
					:class="[
						$style.faq__answer,
						{ [$style['faq__answer--hidden']]: !contentVisible },
					]"
					ref="answer"
					v-html="$t(question.answerKey)"
				></div>
			</div>
		</div>

		<div :class="$style.faq__toggle" @click="toggle">
			<div
				:class="[
					$style.faq__iconWrapper,
					{ [$style['faq__iconWrapper--rotated']]: !collapsed },
				]"
			>
				<i class="fas fa-plus"></i>
			</div>
		</div>
	</div>
	<el-divider />
</template>

<style lang="scss" module>
.faq {
	display: flex;
	position: relative;

	&__content {
		flex: 1;
	}

	&__title {
		color: var(--color-white);
		cursor: pointer;
		font-size: var(--font-size-lg);
		transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
		margin-bottom: 24px;
		margin-right: 16px;

		@media (max-width: 992px) {
			font-size: var(--font-size-md);
			line-height: 150%;
		}
	}

	&__answerWrapper {
		position: relative;
		overflow: hidden;
		will-change: height;
		transition: height 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
		transform: translateZ(0);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		&--hidden {
			visibility: hidden;
			margin-top: 0;
			margin-bottom: 0;
			padding-top: 0;
			padding-bottom: 0;
		}
	}

	&__answer {
		padding: 16px 24px 32px 24px;

		@media (max-width: 992px) {
			padding: 16px 16px 32px;
		}
	}

	&__toggle {
		width: 16px;
		margin-right: 32px;
		font-size: var(--font-size-l);
		cursor: pointer;
		display: flex;
		align-items: flex-start;
		padding-top: 8px;
	}

	&__iconWrapper {
		display: inline-block;
		transition: transform 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
		will-change: transform;
		transform-origin: center;

		&--rotated {
			transform: rotate(45deg);
		}
	}
}

:global(.el-divider) {
	border-top: 1px var(--color-dark-lavender) solid !important;
	margin: 0 0 var(--spacing-l) 0 !important;
}
</style>

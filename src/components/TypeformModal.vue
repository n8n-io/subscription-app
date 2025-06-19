<template>
	<div v-if="isVisible" :class="$style.overlay" @click="closeModal">
		<div :class="$style.modal" @click.stop>
			<button :class="$style.closeButton" @click="closeModal">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path
						d="M18 6L6 18"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
					/>
					<path
						d="M6 6L18 18"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
					/>
				</svg>
			</button>
			<div
				ref="typeformContainer"
				:data-tf-widget="typeformId"
				:data-tf-opacity="100"
				:data-tf-hide-headers="true"
				:data-tf-hide-footer="true"
				:data-tf-transitive-search-params="true"
				:data-tf-medium="'snippet'"
				:data-tf-hidden="hiddenFields"
				:class="$style.typeform"
			></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';

interface Props {
	isVisible: boolean;
	typeformId: string;
	hiddenFields?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	(event: 'close'): void;
	(event: 'completed'): void;
}>();

const typeformContainer = ref<HTMLElement | null>(null);
let typeformWidget: any = null;

// Initialize Typeform widget
function initTypeform() {
	if (!props.isVisible || !typeformContainer.value || !window.tf) return;

	try {
		// Parse hidden fields
		const hiddenFieldsObj: Record<string, string> = {};
		if (props.hiddenFields) {
			const pairs = props.hiddenFields.split(',');
			pairs.forEach((pair) => {
				const [key, value] = pair.split('=');
				if (key && value) {
					hiddenFieldsObj[key.trim()] = value.trim();
				}
			});
		}

		// Create widget
		typeformWidget = window.tf.createWidget(props.typeformId, {
			container: typeformContainer.value,
			opacity: 100,
			hideHeaders: true,
			hideFooter: true,
			height: '100%',
			medium: 'snippet',
			hidden: hiddenFieldsObj,
			onSubmit: () => {
				emit('completed');
			},
		});
	} catch (error) {
		console.error('Failed to initialize Typeform:', error);
	}
}

// Clean up widget
function destroyTypeform() {
	if (typeformWidget) {
		try {
			typeformWidget.unmount();
		} catch (error) {
			console.error('Error unmounting Typeform:', error);
		}
		typeformWidget = null;
	}
	if (typeformContainer.value) {
		typeformContainer.value.innerHTML = '';
	}
}

// Close modal
function closeModal() {
	destroyTypeform();
	emit('close');
}

// Handle ESC key
function handleKeydown(event: KeyboardEvent) {
	if (event.key === 'Escape' && props.isVisible) {
		closeModal();
	}
}

// Watch for visibility changes
watch(
	() => props.isVisible,
	async (newValue) => {
		if (newValue) {
			// Modal is opening
			document.body.style.overflow = 'hidden';
			await nextTick();
			initTypeform();
		} else {
			// Modal is closing
			document.body.style.overflow = '';
			destroyTypeform();
		}
	}
);

onMounted(() => {
	document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
	document.removeEventListener('keydown', handleKeydown);
	document.body.style.overflow = '';
	destroyTypeform();
});
</script>

<style lang="scss" module>
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.75);
	transition: opacity 0.25s ease-in-out;
	z-index: 10001;
	display: flex;
	align-items: center;
	justify-content: center;
}

.modal {
	position: relative;
	width: calc(100% - 40px);
	height: calc(100% - 40px);
	margin: 20px;
	background: white;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
	display: flex;
	flex-direction: column;
}

.closeButton {
	position: absolute;
	top: 16px;
	right: 16px;
	background: rgba(255, 255, 255, 0.9);
	border: none;
	border-radius: 50%;
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	z-index: 10002;
	transition: all 0.2s;
	color: #333;

	&:hover {
		background: rgba(255, 255, 255, 1);
		transform: scale(1.1);
	}

	svg {
		width: 20px;
		height: 20px;
	}
}

.typeform {
	width: 100%;
	height: 100%;
	flex: 1;

	:global(iframe) {
		width: 100% !important;
		height: 100% !important;
		border: none !important;
		border-radius: 8px;
	}
}

@media (max-width: 768px) {
	.modal {
		width: calc(100% - 40px);
		height: calc(100% - 40px);
		margin: 20px;
	}

	.closeButton {
		top: 12px;
		right: 12px;
		width: 36px;
		height: 36px;

		svg {
			width: 18px;
			height: 18px;
		}
	}
}
</style>

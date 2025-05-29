<template>
	<button
		:class="[$style.button, $style[`button--${variant}`]]"
		type="button"
	>
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
defineProps({
	variant: {
		type: String,
		default: 'primary',
		validator: (value: string) => ['primary', 'secondary'].includes(value),
	},
});
</script>

<style lang="scss" module>
@property --bg-color-1 {
	syntax: '<color>';
	inherits: true;
	initial-value: transparent;
}

@property --bg-color-2 {
	syntax: '<color>';
	inherits: true;
	initial-value: transparent;
}

@property --bg-color-3 {
	syntax: '<color>';
	inherits: true;
	initial-value: transparent;
}

@property --bg-color-4 {
	syntax: '<color>';
	inherits: true;
	initial-value: transparent;
}

.button {
	display: flex;
	padding: 16px 24px;
	justify-content: center;
	align-items: center;
	border-radius: 8px;
	font-weight: normal;
	white-space: nowrap;
	text-align: center;
	cursor: pointer;
	transition: box-shadow 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
	position: relative;
	border: none;
	flex: 1;
	width: 100%;
	height: 48px;

	&--primary {
		--bg-color-1: rgba(255, 255, 255, 0);
		--bg-color-2: rgba(255, 255, 255, 0);
		--bg-color-3: #077ac7;
		--bg-color-4: #6b21ef;

		transition-property: box-shadow, --bg-color-1, --bg-color-2,
			--bg-color-3, --bg-color-4;
		transition-duration: 400ms, 300ms, 300ms, 300ms, 300ms;
		transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94), linear,
			linear, linear, linear;

		background: linear-gradient(
				to bottom,
				var(--bg-color-1),
				var(--bg-color-2)
			),
			linear-gradient(141deg, var(--bg-color-3), var(--bg-color-4));

		box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.2),
			0 1px 2px 0 rgba(8, 8, 8, 0.2), 0 4px 4px 0 rgba(8, 8, 8, 0.08),
			0 7px 0 -12px #077ac7, inset 0 6px 12px 0 rgba(255, 255, 255, 0.12);

		color: white;
		letter-spacing: 0.3px;

		&:hover {
			--bg-color-1: rgba(255, 255, 255, 0.1);
			--bg-color-2: rgba(255, 255, 255, 0);
			box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2),
				0 1px 2px rgba(8, 8, 8, 0.2), 0 4px 4px rgba(8, 8, 8, 0.08),
				0 7px 80px -12px #ee4f27,
				inset 0 6px 12px rgba(255, 255, 255, 0.12);
		}

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}

	&--secondary {
		border: 1px solid rgba(255, 255, 255, 0.15);
		background: rgba(255, 255, 255, 0.1);
		color: white;
		transition: background-color 500ms, box-shadow 400ms;

		&:hover {
			background: rgba(255, 255, 255, 0.1);
			box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 0.2) inset,
				0px 1px 2px 0px rgba(8, 8, 8, 0.2),
				0px 4px 4px 0px rgba(8, 8, 8, 0.08), 0px 7px 80px -10px #fff,
				0px 6px 12px 0px rgba(255, 255, 255, 0.12) inset;
		}

		&:disabled {
			color: rgba(255, 255, 255, 0.5);
			cursor: not-allowed;
		}
	}
}
</style>

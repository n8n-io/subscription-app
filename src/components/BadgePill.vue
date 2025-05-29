<script setup lang="ts">
interface BadgeStylesProps {
	wrapper?: string;
	icon?: string;
	text?: string;
}

export type BadgeVariant = 'dark' | 'orange' | 'black' | 'pink';

interface BadgeProps {
	styles?: BadgeStylesProps;
	variant?: BadgeVariant;
	iconVariant?: BadgeVariant;
}

withDefaults(defineProps<BadgeProps>(), {
	variant: 'dark',
});
</script>

<template>
	<div
		:class="[
			$style.badge,
			$style[`badge--${variant}`],
			styles?.wrapper,
			{
				[$style['badge--no-icon']]: !$slots.icon,
			},
		]"
	>
		<span
			v-if="$slots.icon"
			:class="[
				$style.badge__icon,
				$style[`badge__icon--${variant}`],
				$style[`badge__icon--${iconVariant || variant}`],
				styles?.icon,
			]"
		>
			<slot name="icon" />
		</span>
		<span v-if="$slots.default" :class="[$style.badge__text, styles?.text]">
			<slot></slot>
		</span>
	</div>
</template>

<style lang="scss" module>
.badge {
	height: 32px;
	display: flex;
	padding: 4px 10px 4px 4px;
	align-items: center;
	gap: 5px;
	border: 0.5px solid rgba(255, 255, 255, 0.1);
	border-radius: 44px;
	background-color: rgb(31, 25, 42);
	opacity: 1;
	backdrop-filter: blur(22px);
	color: white;
	font-size: 12px;
	cursor: text;
	width: fit-content;
	transition-property: all, color, opacity;
	transition-duration: 200ms, 200ms, 200ms;
	transition-timing-function: ease, ease, ease;
	background-repeat: no-repeat;

	&--no-icon {
		padding-left: 12px;
	}

	&--pink,
	&--orange,
	&--dark {
		background-image: radial-gradient(
				circle closest-corner at 50% 160%,
				#8b5261,
				transparent 67%
			),
			linear-gradient(rgba(255, 255, 255, 0.18), transparent);
		box-shadow: 0px 0px 0px 0px #c4bbd3 inset,
			0px 4px 4px 0px rgba(14, 9, 24, 0.44), 0px 13px 16px -8px #000,
			0px 4px 12px 0px rgba(255, 255, 255, 0.05) inset;
		backdrop-filter: blur(22px);
	}

	&--black {
		border-radius: 24px;
		border: 0.5px solid rgba(255, 255, 255, 0.2);
		background: linear-gradient(
			180deg,
			#554567 0%,
			rgba(38, 33, 73, 0) 100%
		);
	}

	&__icon {
		display: flex;
		width: 24px;
		height: 24px;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		box-shadow: 0px 4.818px 9.635px 0px rgba(255, 255, 255, 0.12) inset,
			0px 0.803px 0.803px 0px rgba(255, 255, 255, 0.2) inset,
			0px 3.212px 3.212px 0px rgba(8, 8, 8, 0.08),
			0px 0.803px 1.606px 0px rgba(8, 8, 8, 0.2) inset;

		&--dark {
			background-image: radial-gradient(
				88% 125% at 25% 0%,
				rgba(19, 138, 242, 0.9) 0%,
				rgba(82, 0, 146, 0.9) 100%
			);
		}

		&--orange {
			background-image: radial-gradient(
				286.48% 406.94% at -41.88% -152%,
				rgba(255, 248, 240, 0.9) 0%,
				rgba(255, 155, 38, 0.9) 29.55%,
				rgba(238, 79, 39, 0.9) 62.05%,
				rgba(82, 0, 146, 0.9) 100%
			);
		}

		&--pink {
			background-image: radial-gradient(
				170.78% 242.6% at 25% 0%,
				rgba(255, 255, 255, 0.9) 0%,
				rgba(255, 31, 255, 0.9) 19.05%,
				rgba(0, 15, 146, 0.9) 100%
			);
		}

		&--black {
			padding-top: 0;
			box-shadow: none;
			background-image: none;
		}
	}

	&__text {
		color: rgba(255, 255, 255, 0.93);
		font-weight: normal;
		font-size: 14px;
		line-height: 1;
	}
}
</style>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { SUPPORT_EMAIL } from './constants';
</script>

<template>
	<el-config-provider size="small" :z-index="3000">
		<header>
			<img
				alt="n8n logo"
				class="logo"
				src="@/assets/logo.png"
				height="25"
			/>
		</header>

		<main>
			<RouterView />
		</main>

		<footer>
			<span>
				<i :class="['fas', 'fa-info-circle', $style.infoIcon]"></i>
			</span>
			{{ $t('subscription.helpinfo') }}
			<a :href="`mailto:${SUPPORT_EMAIL}`">{{
				$t('subscription.helpinfo.email')
			}}</a>
		</footer>
	</el-config-provider>
</template>

<style module>
footer {
	padding-bottom: var(--spacing-xl);
}

.infoIcon {
	color: var(--color-text-light);
}
</style>

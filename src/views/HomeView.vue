<script setup lang="ts">
import PlanCard from '@/components/PlanCard.vue';
import { COMMUNITY_PLAN, ENTERPRISE_PLAN, TEAM_PLAN } from '@/constants';
</script>

<template>
	<main>
		<div :class="$style.plans">
			<PlanCard :plan="COMMUNITY_PLAN" />
			<PlanCard :plan="TEAM_PLAN" />
			<PlanCard :plan="ENTERPRISE_PLAN" />
		</div>
	</main>
</template>

<style lang="scss" module>
main {
	padding-top: var(--spacing-m);
}

.plans {
	display: flex;
	justify-content: center;

	> div + div {
		margin-left: var(--spacing-m);
	}
}
</style>

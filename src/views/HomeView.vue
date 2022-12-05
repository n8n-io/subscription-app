<script setup lang="ts">
import PlanCard from '@/components/PlanCard.vue';
import {
	COMMUNITY_PLAN,
	ENTERPRISE_PLAN,
	TEAM_PLAN,
	TEAM_PLAN_NAME,
} from '@/constants';
import { computed, onMounted, ref, type Ref } from 'vue';
import { usePlansStore } from '@/stores/plans';
import type { Product } from '@/Interface';

const loading = ref(true);
const plans: Ref<Product[]> = ref([]);
const plansStore = usePlansStore();

onMounted(async () => {
	plans.value = await plansStore.getPlans();
	loading.value = false;
});

const teamProduct = computed(() => {
	return plans.value.find(
		(plan) => plan.metadata.planName === TEAM_PLAN_NAME
	);
});
</script>

<template>
	<main>
		<div :class="$style.plans">
			<PlanCard :plan="COMMUNITY_PLAN" />
			<PlanCard :plan="TEAM_PLAN" :product="teamProduct" />
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

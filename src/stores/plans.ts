import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { checkout, fetchPlans, createSubscription } from '@/api/plans';
import type { Product } from '@/Interface';

export const usePlansStore = defineStore('plans', () => {
	const plans: Ref<Product[]> = ref([]);

	return {
		plans,
		async getPlans() {
			if (plans.value.length) {
				return plans.value;
			}

			plans.value = await fetchPlans();
			return plans.value;
		},
		checkout,
		createSubscription,
	};
});

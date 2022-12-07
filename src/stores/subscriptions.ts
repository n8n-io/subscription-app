import { defineStore } from 'pinia';
import { createSubscription, cancelSubscription } from '@/api/subscriptions';

export const useSubscriptionsStore = defineStore('subscriptions', () => {
	return {
		createSubscription,
		cancelSubscription,
	};
});

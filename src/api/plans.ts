import {
	LICENSE_SERVER_URL,
	TENANT_ID,
	PLANS_ON_PREM_GROUP,
} from '@/constants';
import type { CheckoutSession, Product, Subscription } from '@/Interface';
import { isOpenApiError } from '@/type-guards';

export async function fetchPlans(): Promise<Product[]> {
	const url = new URL('/v1/plan', LICENSE_SERVER_URL);
	url.searchParams.set('tenantId', TENANT_ID);
	url.searchParams.set('group', PLANS_ON_PREM_GROUP);
	const response = await fetch(url.toString());

	const data = response.json();
	if (!response.ok && data) {
		if (isOpenApiError(data)) {
			throw new Error(data.message);
		}

		throw new Error(`${response.status}`);
	}

	return data;
}

export async function checkout(
	productId: string,
	activeWorkflows: number
): Promise<CheckoutSession> {
	const url = new URL('/v1/checkout', LICENSE_SERVER_URL);

	const response = await fetch(url.toString(), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			productId,
			extras: [
				{
					id: 'activeWorkflows',
					values: [activeWorkflows],
				},
			],
		}),
	});

	const data = response.json();
	if (!response.ok && data) {
		if (isOpenApiError(data)) {
			throw new Error(data.message);
		}

		throw new Error(`${response.status}`);
	}

	return data;
}

export async function createSubscription(
	internalCheckoutId: string,
	paddleCheckoutId: string
): Promise<Subscription> {
	const url = new URL('/v1/subscription', LICENSE_SERVER_URL);

	const response = await fetch(url.toString(), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			internalCheckoutId,
			paddleCheckoutId,
		}),
	});

	const data = response.json();
	if (!response.ok && data) {
		if (isOpenApiError(data)) {
			throw new Error(data.message);
		}

		throw new Error(`${response.status}`);
	}

	return data;
}

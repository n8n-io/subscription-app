import {
	LICENSE_SERVER_URL,
	TENANT_ID,
	PLANS_ON_PREM_GROUP,
} from '@/constants';
import type { Product } from '@/Interface';
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

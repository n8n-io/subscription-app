import { LICENSE_SERVER_URL } from '@/constants';
import type { CheckoutSession } from '@/Interface';
import { hasErrorMessage } from '@/type-guards';

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

	const data = await response.json();
	if (!response.ok && data) {
		if (hasErrorMessage(data)) {
			throw new Error(data.message);
		}

		throw new Error(`${response.status}`);
	}

	return data;
}

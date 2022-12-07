import { LICENSE_SERVER_URL } from "@/constants";
import type { Subscription } from "@/Interface";
import { hasErrorMessage } from "@/type-guards";

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

	const data = await response.json();
	if (!response.ok && data) {
		if (hasErrorMessage(data)) {
			throw new Error(data.message);
		}

		throw new Error(`${response.status}`);
	}

	return data;
}

export async function cancelSubscription(
	managementToken: string,
): Promise<Subscription> {
	const url = new URL('/v1/subscription/cancel', LICENSE_SERVER_URL);

	const response = await fetch(url.toString(), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			managementToken,
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

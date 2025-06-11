import { getEnvironmentConfig } from '@/utils/environment';

const paddleConfig = getEnvironmentConfig();

export interface DirectCheckoutOptions {
	productId: string;
	successUrl?: string;
	successCallback?: (data: any) => void;
}

async function initializePaddle(options: DirectCheckoutOptions): Promise<void> {
	if (!window.Paddle?.Initialize) {
		throw new Error('Paddle V2 is required');
	}

	if (!paddleConfig.clientToken) {
		throw new Error('Paddle client token is required');
	}

	window.Paddle.Environment.set(paddleConfig.environment);

	const currentUrl = new URL(window.location.href);
	const baseUrl = `${currentUrl.protocol}//${currentUrl.host}`;

	(window.Paddle.Initialize as any)({
		token: paddleConfig.clientToken,
		eventCallback: (data: any) => {
			if (data.name === 'checkout.completed') {
				const managementUrl = `${baseUrl}/manage?token=${data.data.transaction_id}`;
				window.location.href = managementUrl;
			}
			if (options.successCallback) {
				options.successCallback(data);
			}
		},
	});
}

export async function openPaddleCheckout(
	options: DirectCheckoutOptions
): Promise<void> {
	try {
		await initializePaddle(options);

		const checkoutOptions: any = {
			items: [
				{
					priceId: options.productId,
					quantity: 1,
				},
			],
		};

		window.Paddle!.Checkout.open(checkoutOptions);
	} catch (error) {
		throw new Error(
			'Unable to open checkout. Please try again or contact support.'
		);
	}
}

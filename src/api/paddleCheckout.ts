import { getEnvironmentConfig } from '@/utils/environment';

const paddleConfig = getEnvironmentConfig();

export interface DirectCheckoutOptions {
	productId: string;
	successCallback?: (data: any) => void;
	closeCallback?: () => void;
}

async function initializePaddle(): Promise<void> {
	if (!window.Paddle?.Initialize) {
		throw new Error('Paddle V2 is required');
	}

	if (!paddleConfig.clientToken) {
		throw new Error('Paddle client token is required');
	}

	window.Paddle.Environment.set(paddleConfig.environment);
	window.Paddle.Initialize({
		token: paddleConfig.clientToken,
	});
}

export async function openPaddleCheckout(
	options: DirectCheckoutOptions
): Promise<void> {
	try {
		await initializePaddle();

		const currentUrl = new URL(window.location.href);
		const baseUrl = `${currentUrl.protocol}//${currentUrl.host}`;

		window.Paddle!.Checkout.open({
			items: [
				{
					priceId: options.productId,
					quantity: 1,
				},
			],
			successCallback: (data) => {
				if (data.checkout?.id) {
					const managementUrl = `${baseUrl}/manage?token=${data.checkout.id}`;
					window.location.href = managementUrl;
				}
				if (options.successCallback) options.successCallback(data);
			},
			closeCallback: () => {
				if (options.closeCallback) options.closeCallback();
			},
		});
	} catch (error) {
		throw new Error(
			'Unable to open checkout. Please try again or contact support.'
		);
	}
}

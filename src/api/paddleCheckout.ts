import { getEnvironmentConfig } from '@/utils/environment';
import type { CustomerData } from '@/components/CustomerInfoModal.vue';

const paddleConfig = getEnvironmentConfig();

export interface DirectCheckoutOptions {
	productId: string;
	successUrl?: string;
	successCallback?: (data: any) => void;
	customerData?: CustomerData;
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
				const thankYouUrl = `${baseUrl}/thank-you?token=${data.data.transaction_id}`;
				window.location.href = thankYouUrl;
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

		// Add customer data if provided
		if (options.customerData) {
			checkoutOptions.customer = {
				email: options.customerData.email,
				address: {
					countryCode: options.customerData.address.countryCode,
					postalCode: options.customerData.address.postalCode,
					city: options.customerData.address.city,
					firstLine: options.customerData.address.firstLine,
				},
				business: {
					name: options.customerData.business.name,
				},
			};

			// Add optional fields if present
			if (options.customerData.address.region) {
				checkoutOptions.customer.address.region = options.customerData.address.region;
			}
			if (options.customerData.business.taxIdentifier) {
				checkoutOptions.customer.business.taxIdentifier = options.customerData.business.taxIdentifier;
			}
		}

		window.Paddle!.Checkout.open(checkoutOptions);
	} catch (error) {
		throw new Error(
			'Unable to open checkout. Please try again or contact support.'
		);
	}
}

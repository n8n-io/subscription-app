declare global {
	interface Window {
		Paddle?: Paddle;
		rudderanalytics?: RudderStack;
		tf?: Typeform;
	}
}

interface RudderStack {
	ready: (callback: () => void) => void;
	identify: (
		id: string,
		traits: { [key: string]: string },
		context?: {},
		callback?: () => void
	) => void;
	track: (
		event: string,
		traits: { [key: string]: string | number | {} },
		callback?: () => void
	) => void;
	page: (
		category?: string,
		name?: string,
		properties?: { [key: string]: string }
	) => void;
}

export interface PaddleCheckoutSuccess {
	checkout: {
		created_at: string;
		completed: true;
		id: string;
		coupon: { coupon_code: null };
		passthrough: null;
		prices?: {
			customer?: {
				items?: {
					line_price: number;
					discounts: unknown[];
					recurring?: {
						period: string;
						interval: number;
						trial_days: number;
						currency: string;
						line_price: {};
						discounts: unknown[];
						tax_rate: number;
					};
				}[];
			};
			vendor: unknown;
		};
		redirect_url: null;
		test_variant: string;
		recurring_prices?: {
			customer: unknown;
			interval: { length: number; type: string };
			vendor: unknown;
		};
	};
	product?: { quantity: number; id: number; name: string };
	user?: { id: string; email: string; country: string };
}

export interface Paddle {
	Environment: {
		set: (environment: 'sandbox' | 'production') => void;
	};
	Initialize: (info: { token: string }) => void;
	Checkout: {
		open: (info: {
			items?: Array<{
				priceId: string;
				quantity?: number;
			}>;
			settings?: {
				successUrl?: string;
			};
			successCallback?: (data: PaddleCheckoutSuccess) => void;
			closeCallback?: () => void;
		}) => void;
	};
}

export interface OpenApiError {
	code: number;
	message: string;
	errors?: {}[];
}

export type CheckoutSession = {
	id: string;
	paddle: {
		setup: {
			vendor: number;
		};
		checkout: {
			override: string;
		};
		sandbox?: boolean;
	};
};

export type Subscription = {
	id: string;
	reservationId: string;
};

export interface FAQ {
	questionKey: string;
	answerKey: string;
}

export interface SubscriptionCancellation {
	expiry: string;
}

export type BillingPeriod = 'monthly' | 'annual';

export interface ProductMapping {
	monthly: string;
	annual: string;
}

export interface WorkflowProductMappings {
	[workflowCount: number]: ProductMapping;
}

export interface TypeformWidget {
	unmount: () => void;
}

export interface Typeform {
	createWidget: (
		formId: string,
		options: {
			container: HTMLElement;
			opacity?: number;
			hideHeaders?: boolean;
			hideFooter?: boolean;
			height?: number | string;
			medium?: string;
			hidden?: Record<string, string | number>;
			onSubmit?: () => void;
			onReady?: () => void;
		}
	) => TypeformWidget;
}

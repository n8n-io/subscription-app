declare global {
	interface Window {
		Paddle?: Paddle;
		rudderanalytics?: RudderStack;
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
				items?: Array<{
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
				}>;
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
		set: (key: 'sandbox') => void;
	};
	Setup: (info: { vendor: number }) => void;
	Checkout: {
		open: (info: {
			override: string;
			successCallback: (data: PaddleCheckoutSuccess) => void;
		}) => void;
	};
}

export interface OpenApiError {
	code: number;
	message: string;
	errors?: {}[];
}

export interface Option {
	value: string | number;
	labelKey?: string;
}

export interface Feature {
	labelKey: string;
}

export interface PlanBase {
	id: string;
	nameKey: string;
	descriptionKey: string;
	features: Feature[];
	primaryCTA?: 'email' | 'start-trial' | 'get-started';
	secondaryCTA?: 'email';
}

export interface LimitedPlan extends PlanBase {
	unlimited: false;
	unitSize: number;
	options: Option[];
	pricing: 'custom';
}

export interface FreePlan extends PlanBase {
	unlimited: true;
	pricing: 'free';
}

export interface CustomPlan extends PlanBase {
	unlimited: true;
	pricing: 'quote';
}

export type Plan = LimitedPlan | FreePlan | CustomPlan;

export interface ExtraPackage {
	id: string;
	max: number;
	min: number;
	price: {
		USD: number;
	};
	quota: string;
	type: 'package';
	units: number;
}

export interface ActiveWorkflowsExtraPackage extends ExtraPackage {
	id: 'activeWorkflows';
	quota: 'quota:activeWorkflows';
}

export type Extras = ActiveWorkflowsExtraPackage;

export type Product = {
	group: 'on-prem';
	metadata: {
		planName: string;
		position: number;
		terms: {
			billingFrequency: 'monthly' | 'yearly';
			isMainPlan: boolean;
			paddlePlanId: number;
			price: {
				USD: number;
			};
			trialDays: number;
			extras: Extras[];
		};
	};
	productId: string;
	tenantId: number;
};

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

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
	primaryCTA?: 'email' | 'start-trial';
	secondaryCTA?: 'email';
}

export interface LimitedPlan extends PlanBase {
	unlimited: false;
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
};

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

export interface OpenApiError {
	code: number;
	message: string;
	errors?: {}[];
}

export interface Option {
	value: string;
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
